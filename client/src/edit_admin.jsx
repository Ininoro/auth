
import './App.css'
import Admin_now from './admin_now'
import Admin_edit from './admin_edit'

function Edit_admin() {

  return (
    <>

    <div className="main">
      <h1>Редактировать данные</h1>

        <div className='div_form'>
          <Admin_now />
          <Admin_edit />
        </div>
    </div>
      
    </>
  )
}

export default Edit_admin
