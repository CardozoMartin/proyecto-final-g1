import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Admin, Home, Login, Register, Contact } from '../../routes/Path'
import "../../css/Navbar.css"
import { AlignJustify } from 'lucide-react'
import { useUser } from '../../store/useUser'
import Swal from 'sweetalert2'

const Navbar = () => {
    const { usuario, logout } = useUser()
    const navigate = useNavigate()

    const handleEliminarSesion = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "¡Vas a cerrar tu sesión!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Sesión cerrada",
                    text: "Has cerrado sesión correctamente.",
                    icon: "success"
                });
                logout()
                navigate('/login')
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu sesión sigue activa.",
                    icon: "error"
                });
            }
        });
    }

    return (
        <nav className="navbar bg-navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand nav-item">Aura</a>
                <button className="navbar-toggler nav-item" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon nav-item"><AlignJustify /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav color-font d-flex ms-auto mb-2 mb-lg-0 me-5">
                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Home}>Home</Link>
                        </li>
                        {/* Mostrar solo para ADMIN */}
                        {usuario && usuario.cliente?.rol === "ADMIN" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Admin}>Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Contact}>Contacto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to="/productos">Productos</Link>
                                </li>
                            </>
                        )}
                        {/* Mostrar solo para CLIENTE */}
                        {usuario && usuario.cliente?.rol === "CLIENTE" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to="/productos">Productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Contact}>Contacto</Link>
                                </li>
                            </>
                        )}
                        {/* Si no hay usuario, mostrar registro y login */}
                        {!usuario && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Register}>Registro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Login}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to="/productos">Productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Contact}>Contacto</Link>
                                </li>
                            </>
                        )}
                        {/* Botón de cerrar sesión solo si hay usuario */}
                        {usuario && (
                            <li className="nav-item">
                                <button className='btn btn-danger' onClick={handleEliminarSesion}>Cerrar sesión</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar