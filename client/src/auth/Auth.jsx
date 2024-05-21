import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Log = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {

    }, [authState])

    return (
        authState.error ? <p>{authState.error}</p> :
            authState.loading ? <p>Loading...</p> :
                <div className="main">

                <h1>Авторизация</h1>

                <div className='div_form'>
                    <input placeholder='username' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} type="text" />
                    <input placeholder='password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" />
                </div>
                    <button onClick={() => {
                        dispatch(loginThunk({
                            username: username,
                            password: password
                        }))
                    }}>войти</button>

                    <a className="footer_a">Нет аккаунта? <Link to={'/reg'}><a>Регистрация</a></Link></a>
                </div>
    )
}

export default Log