/**
 * @description 双向绑定 筛选列表
 * @author qingsds
 */

import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { USERS_API } from '../api'

export default function SearchUserList() {
    const [users, setUsers] = useState<any[] | null>(null)
    const [searchKey, setKey] = useState<string>('')

    useEffect(() => {
        let didCancel = false
        const doFetch = async () => {
            try {
                if (!didCancel) {
                    const res = await axios(`${USERS_API}`)
                    setUsers(res.data.data)
                }
            } catch (error) {
                if (!didCancel) {
                    console.error((error as Error).message)
                }
            }
        }
        doFetch()
        return () => {
            didCancel = true
        }
    }, [])

    const finalToShow = useMemo(() => {
        if (users == null) return null
        if (!searchKey) return users

        return users.filter(user => {
            return user.first_name.toLowerCase().includes(searchKey)
        })
    }, [users, searchKey])
    // 根据 finalToShow 来判断是否是加载状态
    const isLoading = finalToShow == null ? true : false

    return (
        <div>
            <input
                type='text'
                value={searchKey || ''}
                placeholder={'键入要搜索的用户名'}
                onChange={e => setKey(e.target.value)}
            />
            <br />
            {isLoading ? (
                <span>loading...</span>
            ) : (
                finalToShow?.length &&
                finalToShow.map((user, index) => {
                    return <li key={index}>{user.first_name}</li>
                })
            )}
        </div>
    )
}
