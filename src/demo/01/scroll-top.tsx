import { useEffect, useRef, useState } from 'react'

interface DocumentPosition {
    x: number
    y: number
}

export const getPosition = (): DocumentPosition => {
    return {
        x: document.body.scrollLeft,
        y: document.body.scrollTop,
    }
}

export const useScrollPosition = () => {
    const [position, setPosition] = useState<DocumentPosition>(getPosition())

    useEffect(() => {
        const handleScroll = () => {
            const position = getPosition()
            setPosition(position)
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return position
}

const ScrollBar = () => {
    const position = useScrollPosition()
    const { y } = position

    const toTop = () => {
        document.body.scrollTop = 0
    }
    if (y > 300) {
        return (
            <p
                style={{ position: 'fixed', right: '10px', bottom: '10px' }}
                onClick={toTop}
            >
                go back top
            </p>
        )
    } else {
        return null
    }
}

export default function ScrollTop() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [num, updateNum] = useState(0)

    const handleClick = () => {
        const toNum = parseInt(inputRef.current?.value || '0') || 0
        updateNum(toNum)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div>
            <input type='text' ref={inputRef} />
            <button onClick={handleClick}>add li;</button>
            <br />
            {num >= 0 &&
                new Array(num).fill(0).map((_, i) => {
                    return <li key={i}>{i}</li>
                })}
            <ScrollBar />
        </div>
    )
}
