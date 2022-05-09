import { Button } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MOCK_DATA_2 } from '../mock/mock-data'
import { modalReducer, useNiceModal, USER_INFO_MODAL } from './nice-model'
import UserInfoModal from './user-info-modal'
import UserList, { User } from './user-list'

const createUser = (user: Partial<User>): Partial<User> => {
    return {
        id: Date.now() + '',
        city: 'unknown',
        ...user,
    }
}

const store = createStore(modalReducer)
function UserLayout() {
    const modal = useNiceModal(USER_INFO_MODAL)
    const [users, setUsers] = useState<User[]>(MOCK_DATA_2.slice(0, 5))
    const handleClick = () => {
        modal
            .show()
            .then(newUser => setUsers(
                [...users, createUser(newUser) as User])
            )
    }

    return (
        <div className='exp-14-users'>
            <Sider>
                <Button type={'primary'} onClick={handleClick}>
                    + New user
                </Button>
            </Sider>
            <section>
                <UserList users={users} setUsers={setUsers} />
            </section>
            <UserInfoModal />
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <Provider store={store} children={<UserLayout />} />
}
