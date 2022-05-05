/**
 * @description 处理网络请求
 * @author qingsds
 */

import { Reducer,  useEffect, useReducer, useState } from 'react'
interface State {
    data: any | null
    isLoading: boolean
    success: boolean
}

type Status = 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE'

const fetchReducer: Reducer<
    State,
    { type: Status; payload?: Partial<State> }
> = (state, action): State => {
    const { type, payload } = action
    switch (type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, success: false }
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, success: true, data: payload }
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, success: false }
        default:
            return state
    }
}

export const useFetch = (url: string) => {
    const [_url, setUrl] = useState(url)
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        isLoading: false,
        success: false,
    })

    useEffect(() => {
        // 处理竞态问题, 防止任务被取消但还是触发了 dispatch
        let didCancel = false

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const res = await window.fetch(_url)
                const data = await res.json()
                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' })
                }
            }
        }
        fetchData()
    }, [_url])

    return [state, setUrl] as const
}
