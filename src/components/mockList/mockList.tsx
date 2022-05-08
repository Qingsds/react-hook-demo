/**
 * @description 受控组件
 * @author qingsds
 */

import { useState } from 'react'
import { useFetch } from './hook'

const targetUrl = 'https://hn.algolia.com/api/v1/search?query='

function SearchPanel({ setUrl }: { setUrl: (value: string) => void }) {
    const [query, setQuery] = useState<string>()

    const handleSubmit = () => {
        setUrl(targetUrl + `${query}`)
    }
    return (
        <form onSubmit={e => e.preventDefault()}>
            <input
                type='text'
                value={query || ''}
                onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSubmit}>search</button>
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

export default function Index() {
    const [state, setUrl] = useFetch(targetUrl)

    return (
        <div>
            <SearchPanel setUrl={setUrl} />
            {state.isLoading ? (
                <p>loading....</p>
            ) : (
                <List data={state.data?.hits || []} />
            )}
        </div>
    )
}
