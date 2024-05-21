import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { regThunk } from '../redux/regSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Reg = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const regState = useSelector((state) => state.reg)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {
        if (regState.message) {
            nav('/auth')
        }
    }, [regState])

    return (
        regState.error ? <p>{regState.error}</p> :
            regState.loading ? <p>Loading...</p> :
                <div className="main">

                    <h1>Регистрация</h1>

                    <div className='div_form'>

                    <input value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} type="text"  placeholder="username" />
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email"  placeholder="email" />
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password"  placeholder="password" />
                    
                    </div>

                    <button onClick={() => {
                        dispatch(regThunk({
                            username: username,
                            email: email,
                            password: password
                        }))
                    }}>зарегистрироваться</button>

                    <a className="footer_a">Есть аккаунт? <Link to={'/auth'}><a>Войти</a></Link></a>
                    
                </div>
    )
}

export default Reg