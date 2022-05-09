import { Input } from 'antd'
import { useMemo, useState } from 'react'
// import { useSearchParam } from 'react-use'
import { MOCK_DATA } from '../mock/mock-data'

/**
 * @description search-box 监听 通过url 参数来查询
 * @author qingsds
 */
interface Data {
    id: number
    title: string
}

const SearchBox = ({ data }: { data: Data[] }) => {
    // const searchKey = useSearchParam('key') || ''
    const [searchKey, setKey] = useState('')
    const filterData = useMemo(() => {
        return data.filter(v => {
            return v.title.toLowerCase().includes(searchKey.toLowerCase())
        })
    }, [searchKey, data])

    /*     const handleSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        window.history.pushState(
            {},
            '',
            `${window.location.pathname}?key=${evt.target.value}`
        )
    }, []) */

    return (
        <div className='08-filter-list'>
            <h2>Movies Search key by URL</h2>
            <Input
                type={'text'}
                value={searchKey || ''}
                placeholder='search...'
                onChange={e => setKey(e.target.value)}
            />
            <ul style={{ marginTop: '20px' }}>
                {filterData.map(item => {
                    return <li key={item.id}>{item.title}</li>
                })}
            </ul>
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <SearchBox data={MOCK_DATA} />
}
