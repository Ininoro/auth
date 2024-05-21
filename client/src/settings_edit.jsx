import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Settings_edit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const token = useSelector((state) => state.auth.token)


  async function add(name1, email1) {
    const data = new FormData();

    data.append('name', name)
    data.append('email', email)
    
    console.log(data)
    await fetch("http://localhost:3000/edit_user_info/", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name, email
      })
    });
    setName('')
    setEmail('')

  }

  return (
    <>

        <form encType='multipart/form-data' onSubmit={(e) => {
          e.preventDefault()
          console.log("asjdsadjiasdj")
          add(name, email)

        }}>
          <div className='div_form'>
            <input type="text" id="name" name="name" placeholder="Введите новое имя пользователя..." value={name} onChange={(e) => {
              setName(e.target.value)
            }} required />
            <input type="email" id="email" name="email" placeholder="Введите новый email..." value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} required />
          </div>
          <div>
            <input type="submit" value="сохранить" />
          </div>
          <Link to={'/'}> <a className="footer_a"><a>На главную</a></a></Link>
        </form>

    </>
  )
}

export default Settings_edit
