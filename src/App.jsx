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
import ProductosPage from './pages/ProductosPage';
import { useUser } from './store/useUser';
import CartComponente from './components/Cart/CartComponente';
import Footer from './components/Common/Footer';







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
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos/categoria/:nombreCategoria" element={<ProductosPage />} />
        </Routes>

        <CartComponente></CartComponente>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App

