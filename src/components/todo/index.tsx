import { Reducer, useReducer } from 'react'
import SearchPanel from './SearchPanel'
import TodoList from './List'

export interface TodoAction {
    type: 'ADD' | 'DELETE' | 'SEARCH' | 'DONE'
    payload?: Partial<TodoState>
}

export interface TodoState {
    id: number
    text: string
    done: boolean
    createTime: number
}

export default function Todo() {
    const [todoState, dispatch] = useReducer(todoReducer, [])

    return (
        <div>
            <SearchPanel dispatch={dispatch} />
            <TodoList dispatch={dispatch} todos={todoState} />
        </div>
    )
}

const todoReducer: Reducer<TodoState[], TodoAction> = (
    prevState,
    action
): TodoState[] => {
    const { type, payload } = action
    switch (type) {
        case 'ADD':
            return [...prevState, payload as TodoState]
        case 'DELETE':
            return prevState.filter(item => payload?.id !== item.id)
        case 'DONE':
            return prevState.map(item =>
                item.id === payload?.id ? { ...item, ...payload } : item
            )
        case 'SEARCH':
            return prevState.filter(item =>
                item.text.includes(payload?.text || '')
            )
        default:
            throw new Error()
    }
}
