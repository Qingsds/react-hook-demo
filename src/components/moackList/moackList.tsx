import { useEffect, useMemo, useRef, useState } from 'react'

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
function Index() {
    const [queryKey, setKey] = useState<string | null>('react')

    let data
    const getDta = async () => {
        const res = await window.fetch(`${targetUrl}?${queryKey}`)
        return await res.json()
    }

    useEffect(() => {
        const getDta = async () => {
            const res = await window.fetch(`${targetUrl}?${queryKey}`)
            return await res.json()
        }
        getDta()
    },[])
    return <div></div>
}
