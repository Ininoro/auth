import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Add_book() {
  const [book_name, setBookName] = useState('')
  const [book_description, setBookDescription] = useState('')
  const [book_author, setBookAuthor] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [image, setImage] = useState()

  const token = useSelector((state) => state.auth.token)


  async function add(book_name1, book_description1, book_author1, image1) {
    const data = new FormData();

    data.append('book_name', book_name)
    data.append('book_description', book_description)
    data.append('book_author', book_author)
    data.append('image', image[0])
    // const data = {
    //   'book_name': book_name,
    //   'book_description': book_description,
    //   'book_author': book_author,
    //   'image': image
    // }
    console.log(data)
    console.log(image)
    await fetch("http://localhost:3000/add/", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });
    setBookName('')
    setBookDescription('')
    setBookAuthor('')
    setImage()
    setImageValue('')

  }

  return (
    <>

      <div className="main">

        <h1>Книга</h1>

        <form encType='multipart/form-data' onSubmit={(e) => {
          e.preventDefault()
          console.log("asjdsadjiasdj")
          add(book_name, book_description, book_author, image)

        }}>
          <div className='div_form'>
            <input type="text" id="date" name="date" placeholder="Название..." value={book_name} onChange={(e) => {
              setBookName(e.target.value)
            }} required />
            <input type="text" id="place" name="place" placeholder="Описание..." value={book_description} onChange={(e) => {
              setBookDescription(e.target.value)
            }} required />
            <input type="text" id="book_author" name="book_author" placeholder="Автор..." value={book_author} onChange={(e) => {
              setBookAuthor(e.target.value)
            }} required />
            <input type="file" id="book_author" name="image" placeholder="Выберите файл..." value={imageValue} onChange={(e) => {
              setImageValue(e.target.value)
              setImage(e.target.files)
            }} required />
          </div>
          <div>
            <input type="submit" value="отправить" />
          </div>
          <Link to={'/'}> <a className="footer_a"><a>На главную</a></a></Link>
        </form>

      </div>

    </>
  )
}

export default Add_book
