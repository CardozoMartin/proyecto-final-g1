import React from 'react'
import { Link } from 'react-router-dom'
import { Admin, Home, Login, Register, Contact } from '../../routes/Path'
import "../../css/Navbar.css"
import { AlignJustify } from 'lucide-react'


const Navbar = () => {
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
                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Register}>Registro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Login}>Login</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Admin}>Admin</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to={Contact}>Contacto</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link nav-item active fw-bolder" aria-current="page" to="/productos">Productos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar