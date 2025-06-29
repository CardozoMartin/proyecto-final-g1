import React from 'react'
import { Link } from 'react-router-dom'
import { Admin, Home, Login, Register, Contact } from '../../routes/Path'
import "../../css/Navbar.css"
import { AlignJustify } from 'lucide-react'
import { useUser } from '../../store/useUser'
import Swal from 'sweetalert2'


const Navbar = () => {

    const { user, logout} = useUser()
    console.log(user)
    const handleEliminarSesion = () => {
         const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                // eliminamos la sesion
                logout()
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "Cancelled",
                  text: "Your imaginary file is safe :)",
                  icon: "error"
                });
              }
            });
    }
   
    return (
        <nav className="navbar bg-navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand nav-item" >Aura</a>
                <button className="navbar-toggler nav-item" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon nav-item"><AlignJustify /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav color-font d-flex ms-auto mb-2 mb-lg-0 me-5">
                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Home}>Home</Link>
                        </li>
                        {/* Mostrar solo para ADMIN */}
                        {user && user.cliente.rol === "ADMIN" && (
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
                        {user && user.cliente.rol === "CLIENTE" && (
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
                        {!user && (
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
                        {user && (
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