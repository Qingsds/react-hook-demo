import { Table, Tabs } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { MOCK_DATA_2 } from '../mock/mock-data'

const { TabPane } = Tabs
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [state, setState] = useState('users')
    // let page: number | string = useSearchParam('page') || '1'
    // page = parseInt(page)
    const history = useHistory()
    const location = useLocation()
    const getQuery = useCallback(
        (param: string) => {
            const search = new URLSearchParams(location.search)
            return search.get(param)
        },
        [location.search]
    )
    const [page, setPage] = useState(getQuery('page') || '1')
    const handleTabChange = useCallback(
        (tab: string) => {
            setState(tab)
            history.push(`/06/tabPages/${tab}`)
        },
        [history]
    )

    useEffect(() => {
        console.log('rerender')
    })

    const pagination = {
        pageSize: 3,
        current: Number(page),
        onChange: (p: number) => {
            setPage(p + '')
            history.push(`${location.pathname}?page=${p}`)
        },
    }

    return (
        <div>
            <h1>Tabs Page</h1>
            <Tabs activeKey={state} onChange={handleTabChange}>
                <TabPane tab={'Users'} key={'users'}>
                    <Table
                        dataSource={MOCK_DATA_2}
                        columns={[
                            { dataIndex: 'name', title: 'user name' },
                            { dataIndex: 'city', title: 'city' },
                        ]}
                        pagination={pagination}
                        rowKey={'id'}
                    />
                </TabPane>
                <TabPane tab={'Jobs'} key={'jobs'}>
                    <Table
                        pagination={pagination}
                        columns={[{ dataIndex: 'job', title: 'Job title' }]}
                        dataSource={MOCK_DATA_2}
                        rowKey={'id'}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}
