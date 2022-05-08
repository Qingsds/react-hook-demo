/**
 * @description modal
 * @author qingsds
 */

import { Button, Modal, ModalProps } from 'antd'
import { ReactChild, useEffect, useReducer, useState } from 'react'
import client from '../api'
import { fetchReducer } from '../hook'
import useUser from './use-user'

interface UserInfoModal extends ModalProps {
    visible: boolean
    userId?: number | null
    children?: ReactChild
}

const useUsers = () => {
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        isLoading: false,
        error: false,
    })

    useEffect(() => {
        const doFetch = async () => {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const res = await client.get(`users`)
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: { data: res.data },
                })
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                    payload: { message: (error as Error).message },
                })
            }
        }
        doFetch()
    }, [])

    return state
}

const UserInfoModal = ({ visible, userId, ...rest }: UserInfoModal) => {
    let { data: user, message, isLoading } = useUser(userId!)
    user = user?.data
    const content = (
        <div>
            {message && <span style={{ color: 'red' }}>{message}</span>}
            {isLoading && <span>loading...</span>}

            {user && (
                <div className='exp-10-user-info-modal'>
                    <img src={user.avatar} alt='' />
                    <label>{user.name}</label>
                    <p>{user.introduction}</p>
                </div>
            )}
        </div>
    )

    return (
        <Modal
            visible={visible}
            className={'className="exp-10-user-info-modal'}
            modalRender={() => content}
            mask={false}
            {...rest}
        ></Modal>
    )
}

const UserInfoModalWrapper = ({ visible, ...rest }: UserInfoModal) => {
    if (!visible) return null
    return <UserInfoModal visible={visible} {...rest} />
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let { data: users, isLoading, message } = useUsers()
    const [visibleID, setVisibleID] = useState<number | null>(null)
    users = users?.data

    const handleClickToShow = (id: number) => {
        setVisibleID(id)
    }
    const handleHide = () => {
        setVisibleID(null)
    }

    if (isLoading) return <span>loading...</span>
    return (
        <div className='exp-10-user-list'>
            <h1>Users</h1>
            <p>click user to show details</p>
            {message && <span>{message}</span>}

            <ul>
                {users?.map((user: { id: number; name: string }) => (
                    <li key={user.id}>
                        <Button
                            onClick={() => handleClickToShow(user.id)}
                            type={'link'}
                        >
                            {user.name}
                        </Button>
                    </li>
                ))}
            </ul>
            <UserInfoModalWrapper
                visible={!!visibleID}
                userId={visibleID}
                onCancel={handleHide}
                onOk={handleHide}
            />
        </div>
    )
}
