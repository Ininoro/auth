import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'

function Admin_now() {
  const [email, setEmail] = useState('')

  const [my_info, setMyInfo] = useState([])

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    fetch("http://localhost:3000/admin_info/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
      .then(data => data.json())
      .then(data => setMyInfo(data))
  }, [])

  return (
    <>

          {
            my_info.map(el =>
              
              <div className="My_book">
                <a className="status_My_book">Текущий email: {el.email}</a>
              </div>

            
            )
          }
      
    </>
  )
}

export default Admin_now
