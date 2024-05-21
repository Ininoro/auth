import { useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'

function Accept(props) {
  const [status, setStatus] = useState('')

  const token = useSelector((state) => state.auth.token)

  async function add(status) {
    const data = {
      'status': 'Принята',
      id: props.id
    }
    await fetch("http://localhost:3000/edit_status/", {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    setStatus('')

    window.location.reload()
  }

  return (
    <>
      <form>
        <div>
          <input onClick={(e) => {e.preventDefault()
          add()}} type="submit" id='accept' value="Опубликовать" />
        </div>
      </form>

    </>
  )
}

export default Accept
