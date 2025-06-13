import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin, Home, Login, Register } from './routes/Path'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Common/Navbar'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Register" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/Admin" element={<AdminPage></AdminPage>}></Route>
          <Route path="/Error" element={<ErrorPage></ErrorPage>}></Route>
       

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
