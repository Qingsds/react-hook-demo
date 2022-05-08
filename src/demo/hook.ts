/**
 * @description hooks
 * @author qingsds
 */

import { Reducer, useEffect, useReducer, useState } from 'react'
interface State {
    data: any | null
    isLoading: boolean
    error: boolean
    message?: string | null
}

type Status = 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE'

export const fetchReducer: Reducer<
    State,
    { type: Status; payload?: Partial<State> }
> = (state, action): State => {
    const { type, payload } = action
    switch (type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, error: false }
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, error: true, data: payload }
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: true,
                message: payload?.message,
            }
        default:
            return state
    }
}

export const useFetch = (url: string) => {
    const [_url, setUrl] = useState(url)
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        isLoading: false,
        error: false,
    })

    useEffect(() => {
        // 处理竞态问题, 防止任务被取消但还是触发了 dispatch
        let didCancel = false

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const res = await fetch(_url)
                const data = await res.json()
                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({
                        type: 'FETCH_FAILURE',
                        payload: {
                            message: (error as Error).message,
                        },
                    })
                }
            }
        }

        fetchData()

        return () => {
            didCancel = true
        }
    }, [_url])

    return [state, setUrl] as const
}
