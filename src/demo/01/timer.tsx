/**
 * @description useref 
 * @author qingsds
 */

import { useRef, useState } from 'react'

export default function Timer() {
    const [time, setTime] = useState(0)
    const timer = useRef<any>(null)

    const handleClick2Start = () => {
        if (timer.current) clearInterval(timer.current)

        timer.current = setInterval(() => {
            setTime(time => time + 1)
        }, 500)
    }

    const handleClick2Stop = () => {
        clearInterval(timer.current)
    }
    return (
        <div>
            <p>{time}</p>
            <button onClick={handleClick2Start}>start</button>
            <button onClick={handleClick2Stop}>stop</button>
        </div>
    )
}
