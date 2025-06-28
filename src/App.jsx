import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Admin, Home, Login, Register } from './routes/Path'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import ErrorPage from './pages/ErrorPage'
import Navbar from './components/Common/Navbar'
import Contact from './components/contacto/Contact';
import { Toaster } from 'sonner';
import ProductosPage from './pages/ProductosPage';
import CartComponente from './components/Cart/CartComponente';
import { useUser } from './store/useUser';







function App() {

  const { user, estaLogueado} = useUser()
  console.log('¿Está logueado?', estaLogueado)

  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Register" element={<RegisterPage></RegisterPage>}></Route>

          <Route path="/Login" element={estaLogueado ? <Navigate to="/" /> : <LoginPage></LoginPage>}></Route>

          <Route path="/Admin" element={<AdminPage></AdminPage>}></Route>
          <Route path="/Error" element={<ErrorPage></ErrorPage>}></Route>
          <Route path="/Contact" element={<Contact></Contact>}></Route>
          <Route path="/productos" element={<ProductosPage></ProductosPage>}></Route>
        </Routes>

         <Toaster position="top-right" richColors />
       <CartComponente></CartComponente>
      </BrowserRouter>
    </>
  )
}

export default App

