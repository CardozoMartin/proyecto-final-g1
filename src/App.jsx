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
import { useEffect } from 'react';

function App() {

  const {usuario, estaLogueado, inicializar} = useUser()
  console.log('¿Está logueado?', estaLogueado)
useEffect(() => {
    inicializar();
  }, []);
  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Proteger rutas de registro y login */}
          <Route
            path="/Register"
            element={estaLogueado ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route
            path="/Login"
            element={estaLogueado ? <Navigate to="/" replace /> : <LoginPage />}
          />

          <Route path="/productos" element={<ProductosPage />} />
          <Route
            path="/Admin"
            element={
              usuario?.cliente?.rol === "ADMIN"
                ? <AdminPage />
                : <Navigate to="/login" replace />
            }
          />
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/productos/categoria/:nombreCategoria" element={<ProductosPage />} />
        </Routes>

        <CartComponente></CartComponente>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App

