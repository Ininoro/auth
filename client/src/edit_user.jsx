import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Settings_now from './settings_now'
import Settings_edit from './settings_edit'

function Edit_user() {



  return (
    <>

    <div className="main">
      <h1>Редактировать данные</h1>
        <div className='div_form'>

          <Settings_now />
          <Settings_edit />
        </div>
    </div>
      
    </>
  )
}

export default Edit_user
