import React from "react";

const BusquedaProveedor = ({ valorBusqueda, onBuscar }) => {
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8">
          <input
            type="text"
            placeholder="🔍 Buscar por ID, nombre, email o teléfono"
            className="form-control shadow-sm"
            style={{
              borderRadius: "0.5rem",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
            value={valorBusqueda}
            onChange={(e) => onBuscar(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BusquedaProveedor;
