import {
    Reducer,
    ReducerAction,
    ReducerState,
    useReducer,
    useState,
} from 'react'

interface State {
    data: any | null
    isLoading: boolean
    success: boolean
}

type Status = 'START_FETCH' | 'FETCHING' | 'FETCH_END' | 'PENDING'

const fetchReducer: Reducer<State, { type: Status; data: Partial<State> }> = (
    state,
    payload
): State => {
    const { type, data } = payload
    switch (type) {
        case 'START_FETCH':
            return { ...state, ...data }
        case 'FETCHING':
            return { ...state, ...data }
        case 'FETCH_END':
            return { ...state, ...data }
        default:
            return state
    }
}

export const useFetch = (url: string) => {
    const [_url, setUrl] = useState(url)
    const [state, dispatch] = useReducer<any>(fetchReducer, {
        type:"START_FETCH",
        data: {
            data: null,
        },
    })
}
