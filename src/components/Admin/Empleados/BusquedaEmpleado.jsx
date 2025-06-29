import React from 'react';


const BusquedaEmpleado = ({ setTerminoBusqueda }) => {
  const handleChange = (e) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor); 
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, apellido o DNI"
            className="form-control shadow-sm"
            onChange={handleChange}
            style={{
              borderRadius: "0.5rem",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BusquedaEmpleado;