import { Popover } from 'antd'
import { ReactElement } from 'react'
import { MOCK_DATA_2 } from '../mock/mock-data'

interface Data {
    id: string
    name: string
    job: string
    city: string
}

function ListWithMore({
    renderItem,
    data = [],
    max,
}: {
    renderItem: (...item: any) => ReactElement
    data: Data[]
    max: number
}) {
    const elements = data.map((item, index) => renderItem(item, index, data))
    const show = elements.slice(0, max)
    const hide = elements.slice(max)

    return (
        <span className='exp-10-list-with-more'>
            {show}
            {hide.length > 0 && (
                <Popover
                    content={<div style={{ maxWidth: '500px' }}>{hide}</div>}
                >
                    <span className='more-items-wrapper'>
                        and{' '}
                        <span className='more-items-trigger'>
                            {hide.length} more...
                        </span>
                    </span>
                </Popover>
            )}
        </span>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <div className='exp-10-list-with-more'>
            <h1>user names</h1>
            <div className='user-names'>
                liked by:{' '}
                <ListWithMore
                    data={MOCK_DATA_2}
                    max={3}
                    renderItem={user => {
                        return (
                            <span key={user.id} className='user-name'>
                                {user.name}
                            </span>
                        )
                    }}
                />
            </div>
            <br />
            <br />
            <h1>user list</h1>
            <div className='user-list'>
                <div className='user-list-row user-list-row-head'>
                    <span className='user-name-cell'>name</span>
                    <span>city</span>
                    <span>job title</span>
                </div>
            </div>
            <ListWithMore
                max={5}
                data={MOCK_DATA_2}
                renderItem={user => {
                    return (
                        <div className='user-list-row' key={user.id}>
                            <span className='user-name-cell'>{user.name}</span>
                            <span>{user.city}</span>
                            <span>{user.job}</span>
                        </div>
                    )
                }}
            />
        </div>
    )
}
