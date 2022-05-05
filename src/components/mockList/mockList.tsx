import { useEffect, useRef, useState } from 'react'
import { useFetch } from './hook'

function SearchPanel({ setKey }: { setKey: (value: string) => void }) {
    const inputRef = useRef<null | HTMLInputElement>(null)
    return (
        <form>
            <input type='text' ref={inputRef} />
            <button onClick={() => setKey(inputRef.current!.value)}>
                search
            </button>
        </form>
    )
}

function List({ data }: { data: any[] }) {
    return (
        <div>
            {data.map((value: any, index) => {
                const { objectID, title, url } = value
                return (
                    <li key={objectID}>
                        <a href={url}>{title}</a>
                    </li>
                )
            })}
        </div>
    )
}

const targetUrl = 'https://hn.algolia.com/api/v1/search'
export default function Index() {
    const [state, setUrl] = useFetch(targetUrl)
    const [key, setKey] = useState('')
    useEffect(() => {
        setUrl(url => `${targetUrl}?${key || ''}`)
    }, [key, setUrl])
    return (
        <div>
            <SearchPanel setKey={setKey} />
            <List data={state.data.hits || []} />
        </div>
    )
}
