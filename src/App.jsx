import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import RutasPrivadas from './routes/RoutasPrivadas';
import RutasPublicas from './routes/RutasPublicas';
import { Toaster } from 'sonner';

// 🛡 Importar protecciones


function App() {

  const { inicializar } = useUser()

  useEffect(() => {
    inicializar();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos/categoria/:nombreCategoria" element={<ProductosPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Error" element={<ErrorPage />} />

          {/* 🛡 Rutas públicas solo si NO está logueado */}
          <Route element={<RutasPublicas />}>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
          </Route>

          {/* 🛡 Ruta privada para Admin */}
          <Route element={<RutasPrivadas />}>
            <Route path="/Admin" element={<AdminPage />} />
          </Route>
        </Routes>

        <CartComponente />
        <Footer />

        <Toaster richColors position="top-right" closeButton />
      </BrowserRouter>
    </>
  )
}

export default App
