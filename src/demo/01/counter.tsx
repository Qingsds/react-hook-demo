/**
 * @description 计数器
 * @author qingsds
 */

import { useState } from 'react'

const CountLabel = ({ count }: { count: number }) => {
    const color = count < 10 ? 'blue' : 'red'
    return <span style={{ color }}>{count}</span>
}

export default function Counter() {
    const [count, setCount] = useState<number>(0)

    return (
        <button onClick={() => setCount(count + 1)}>
            add count <CountLabel count={count} /> 
        </button>
    )
}
