import { useState } from 'react'
import './App.css'
import My_book from './my_book'
import { Link } from 'react-router-dom'

function My_books() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div className="main">

      <h1>Мои книги</h1>

      <form action="/users/register" method="GET">
        <div className='div_form'>
          <My_book />
        </div>
        <Link to={'/'}> <a className="footer_a"><a>На главную</a></a></Link>
      </form>

    </div>
      
    </>
  )
}

export default My_books
