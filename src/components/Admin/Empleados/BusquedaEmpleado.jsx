import React, { useState } from 'react';
import useCustomEmpleados from '../../../CustomHooks/CustomEmpleado/useCustomEmpleados';

const BusquedaEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const { buscarEmpleadosNombre} = useCustomEmpleados();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarEmpleadosNombre(nombre); 
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder=""
              aria-label="Search"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default BusquedaEmpleado;
