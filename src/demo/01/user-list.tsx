/**
 * @description 状态
 * @author qingsds
 */

import axios from 'axios'
import { useState } from 'react'
import { USERS_API } from '../api'

export default function UserList() {
    const [users, setUsers] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchUser = async () => {
        setLoading(true)
        try {
            const res = await axios(USERS_API)
            setUsers(res.data.data)
            setLoading(false)
        } catch (error) {
            setError(error as Error)
            setLoading(false)
        }
    }

    return (
        <div>
            <button className='user-list' onClick={() => fetchUser()}>
                {isLoading ? 'loading...' : 'search users'}
            </button>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {users.length > 0 &&
                users.map((user, index) => {
                    return (
                        <li key={index}>
                            <span>{user.first_name}</span>
                        </li>
                    )
                })}
        </div>
    )
}
