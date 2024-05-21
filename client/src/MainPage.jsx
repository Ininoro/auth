import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from './redux/authSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MainPage = () => {

    const dispatch = useDispatch()

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)

    return (
        <>

            {
                role === "ADMIN" ? 
                <div className='main'>
                    <h1>Личный кабинет администратора</h1>
                    <div className="main_profile">
                        <Link to={'/Done_books'}><a>Опубликованные книги</a></Link>
                        <Link to={'/undone_books'}><a>Неопубликованные книги</a></Link>
                        <Link to={'/edit_admin'}><a>Мои данные</a></Link>
                    </div>
                    <button onClick={() => {
                        dispatch(logOut())
                    }}>выйти</button>
                </div>
                 : 
                <div className='main'>
                    <h1>Личный кабинет пользователя</h1>
                    <div className="main_profile">
                        <Link to={'/Add_book'}><a>Добавить книгу</a></Link>
                        <Link to={'/My_books'}><a>Мои книги</a></Link>
                        <Link to={'/edit_user'}><a>Мои данные</a></Link>
                    </div>
                    <button onClick={() => {
                        dispatch(logOut())
                    }}>выйти</button>
                </div>
            }
            
        </>
    )
}

export default MainPage