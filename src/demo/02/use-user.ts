import { useEffect, useReducer } from 'react'
import client from '../api'
import { fetchReducer } from '../hook'

// eslint-disable-next-line import/no-anonymous-default-export
export default (id: number) => {
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        isLoading: false,
        error: false,
    })

    useEffect(() => {
        const doFetch = async () => {
            if (!id) return

            dispatch({ type: 'FETCH_INIT' })

            try {
                const res = await client.get(`users/${id}`)
                dispatch({ type: 'FETCH_SUCCESS', payload: { data: res.data } })
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                    payload: { message: (error as Error).message },
                })
            }
        }
        doFetch()
    }, [id])

    return state
}
