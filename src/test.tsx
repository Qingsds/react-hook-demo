import { Slider } from 'antd'
import { Reducer, useReducer } from 'react'

interface State {
    height: number
    width: number
    radius: number
}

interface Action {
    type: string
    payload: number
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, {
        height: 10,
        width: 10,
        radius: 0,
    })

    const style = {
        height: `${state.height}px`,
        width: `${state.width}px`,
        borderRadius: `${state.radius}px`,
        background: 'red',
    }
    return (
        <div className='container' style={{ width: '500px' }}>
            <p>height</p>
            <Slider
                value={state.height}
                min={10}
                max={300}
                onChange={value => dispatch({ type: 'height', payload: value })}
            />
            <p>width</p>
            <Slider
                min={10}
                max={300}
                onChange={value => dispatch({ type: 'width', payload: value })}
            />
            <p>radius</p>
            <Slider
                min={0}
                max={150}
                onChange={(value = 0) =>
                    dispatch({ type: 'radius', payload: value })
                }
            />

            <div className='rectangle' style={style}></div>
        </div>
    )
}

const reducer: Reducer<State, Action> = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'height':
            return { ...state, ...{ height: payload } }
        case 'width':
            return { ...state, ...{ width: payload } }
        case 'radius':
            return { ...state, ...{ radius: payload } }
        default:
            throw new Error()
    }
}
