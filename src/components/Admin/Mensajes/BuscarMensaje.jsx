import React from "react";

const BuscarMensaje = ({ valorFecha, onBuscar }) => {
  return (
    <input
      type="date"
      className="form-control shadow-sm"
      style={{
        borderRadius: "0.5rem",
        padding: "0.75rem",
        fontSize: "1rem",
      }}
      value={valorFecha}
      onChange={(e) => onBuscar(e.target.value)}
    />
  );
};

export default BuscarMensaje;
