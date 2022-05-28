import React, {Key, useEffect, useState} from "react"
import {ApiSystem, UserModel} from "@xotomicro/xotomicro-front-common-registry"

function UserApi({token}: {token: any}) {
    const [users, setUsers]: any = useState(null)
    const [loading, setLoading]: any = useState(false)

    useEffect(() => {
        // eslint-disable-next-line prettier/prettier
        (async () => {
            setLoading(true)
            const data = await ApiSystem.getRequest({url: `http://${process.env.SERVICE_URL}:8080/users`})
            setUsers(data)
            setLoading(false)
        })()
    }, [token])

    if (loading) return <p>Loading...</p>

    if (users) {
        return (
            <div className="user">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Full name</th>
                            <th>Scope</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: UserModel, index: Key | null | undefined) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.fullName}</td>
                                <td>{user.scope}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return <p>Cannot load data</p>
}

export default UserApi
