import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'

function My_book() {
  const [date_of_creation, setDateOfCreation] = useState('')
  const [status, setStatus] = useState('')

  const [My_books, setMyRequests] = useState([])

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    fetch("http://localhost:3000/requests/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
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
            <a className="status_My_book">Статус: {el.status}</a>
          </div>

         
        )
      }


    </>
  )
}

export default My_book
