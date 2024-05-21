import { useEffect, useState } from 'react'
import Undone_book from './undone_book'
import { Link } from 'react-router-dom'
import './App.css'

function UndoneBooks() {


  return (
    <>

      <div className="main">

        <h1>Неопубликованные книги</h1>

        <form action="/users/register" method="GET">
          <div className='div_form'>
            <Undone_book />
          </div>
          <Link to={'/'}> <a className="footer_a"><a>На главную</a></a></Link>
        </form>

      </div>

    </>
  )
}

export default UndoneBooks
