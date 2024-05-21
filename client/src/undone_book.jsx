import { useEffect, useState } from 'react'
import './App.css'
import NotAccept from './notaccept'
import Accept from './accept'

function Undone_book() {
  const [date_of_creation, setDateOfCreation] = useState('')
  const [book_name, setBookName] = useState('')
  const [book_description, setBookDescription] = useState('')
  const [book_author, setBookAuthor] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [image, setImage] = useState()

  const [My_books, setMyRequests] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/undone_books/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
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
            <a className="status_My_book">Название: {el.book_name}</a>
            <a className="status_My_book">Описание: {el.book_description}</a>
            <a className="status_My_book">Автор: {el.book_author}</a>
            <a href={el.image}>{el.image}</a>
            <div className="status_request">
              <Accept id={el.book_id} />
              <NotAccept />
            </div>
          </div>


        )
      }



    </>
  )
}

export default Undone_book
