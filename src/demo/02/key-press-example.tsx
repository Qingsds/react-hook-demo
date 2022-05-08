/**
 * @description 监听键盘事件
 * @author qingsds
 */

import { useCallback, useEffect, useState } from 'react'

const useKeyPress = (domNode = document.body) => {
    const [key, setKey] = useState<string | null>(null)

    const handleKeyPress = useCallback((evt: KeyboardEvent) => {
        setKey(evt.key)
    }, [])

    useEffect(() => {
        domNode.addEventListener('keypress', handleKeyPress)
        return () => {
            domNode.removeEventListener('keypress', handleKeyPress)
        }
    }, [domNode, handleKeyPress])

    return key
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const key = useKeyPress()

    return (
        <div>
            <h1>use-key-press</h1>
            <label>{key || 'N/A'}</label>
        </div>
    )
}
