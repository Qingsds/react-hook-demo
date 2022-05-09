import { EditOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useMemo } from 'react'
import { useNiceModal } from './nice-model'

export interface User {
    id: string
    name: string
    job: string
    city: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
    users,
    setUsers,
}: {
    users: User[]
    setUsers: (val: any) => void
}) => {
    const { show: showModal } = useNiceModal('user-info-modal')

    const columns = useMemo(
        () => [
            { title: 'Name', dataIndex: 'name' },
            { title: 'Job Title', dataIndex: 'job' },
            { title: 'City', dataIndex: 'city' },
            {
                title: 'Action',
                render(value: any, user: User) {
                    return (
                        <Button
                            type={'link'}
                            icon={<EditOutlined />}
                            onClick={() =>
                                showModal({ user }).then(newUser => {
                                    setUsers((users: User[]) => {
                                        const update = users.map(u =>
                                            u.id === newUser.id ? newUser : u
                                        )
                                        return update
                                    })
                                })
                            }
                        />
                    )
                },
            },
        ],
        [showModal, setUsers]
    )

    return (
        <Table
            size={'small'}
            columns={columns}
            pagination={false}
            dataSource={users}
            rowKey={'id'}
        />
    )
}
