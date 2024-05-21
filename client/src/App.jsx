import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Reg from './reg/Reg'
import Log from './auth/Auth'
import { useSelector } from 'react-redux'
import MainPage from './MainPage'
import Add_book from './Add_book.jsx';
import Done_books from './Done_books.jsx';
import My_books from './My_books.jsx';
import Edit_admin from './edit_admin.jsx';
import Edit_user from './edit_user.jsx';
import undone_books from './undone_books.jsx';
import UndoneBooks from './undone_books.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/reg" />
  },
  {
    path: '/reg',
    element: <Reg />
  },
  {
    path: '/auth',
    element: <Log />
  },
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Navigate to="/" />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  }
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Navigate to="/" />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  },
  {
    path: 'admin',
    element: <>admin</>
  },
  {
    path: "/Done_books",
    element: <Done_books />,
  },

  {
    path: "/undone_books",
    element: <UndoneBooks />,
  },
  {
    path: "/Edit_admin",
    element: <Edit_admin />,
  },
  {
    path: "/Add_book",
    element: <Add_book />,
  },
  {
    path: "/My_books",
    element: <My_books />,
  },
  {
    path: "/Edit_user",
    element: <Edit_user/>,
  }
])


function App() {

  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)

  console.log(token);


  return (
    token ? role === "ADMIN" ? <RouterProvider router={authRouterAdmin} /> : <RouterProvider router={authRouterAdmin} /> :
    <RouterProvider router={router} />
  )
}

export default App
