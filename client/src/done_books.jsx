import { useState } from 'react'
import './App.css'
import Done_book from './done_book'
import { Link } from 'react-router-dom'

function Done_books() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div className="main">

      <h1>Опубликованные книги</h1>

      <form action="/users/register" method="GET">
        <div className='div_form'>
          <Done_book />
        </div>
        <Link to={'/'}> <a className="footer_a"><a>На главную</a></a></Link>
      </form>

    </div>
      
    </>
  )
}

export default Done_books
