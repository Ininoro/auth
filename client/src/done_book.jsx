import { useEffect, useState } from 'react'
import './App.css'

function Done_book() {
  const [date_of_creation, setDateOfCreation] = useState('')
  const [status, setStatus] = useState('')

  const [My_books, setMyRequests] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/Done_books/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(data => setMyRequests(data))
  }, [])

  return (
    <>

    {
        My_books.map(el =>
          
          <div className="My_book">
            <a className="date_My_book">Книга от {el.date_of_creation}</a>
            <a className="status_request">Статус: {el.status}</a>
          </div>

         
        )
      }
      
    </>
  )
}

export default Done_book
