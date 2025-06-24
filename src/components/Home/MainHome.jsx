import React from "react";
import { Card } from "react-bootstrap";
import CardHome from "./CardHome";
import { categorias } from "../../Data/categorias";
const MainHome = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#f7ca0b" }}
      >
        <div className="container">
          <a className="navbar-brand" href="/" style={{ color: "#000000" }}>
            Ferretería "Aura"
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
        </div>
      </nav>
      <div className="card text-white mb-5" style={{ border: "none" }}>
        <img
          src="/herramienta.jpg"
          className="card-img"
          alt="Herramientas"
          style={{
            filter: "brightness(50%)",
            height: "500px",
            objectFit: "cover",
          }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-4" style={{ color: "#ffffff" }}>
            <i className="bi bi-wrench me-2" aria-hidden="true"></i> Bienvenidos
            a Ferretería "Aura"
          </h1>
          <p className="lead" style={{ color: "#ffffff" }}>
            Todo lo que necesitas para tus proyectos de construcción y hogar.
          </p>
          <a
            href="#"
            className="btn btn-lg"
            style={{
              backgroundColor: "#f7ca0b",
              color: "#000000",
              borderColor: "#000000",
            }}
          >
            Explorar Productos
          </a>
        </div>
      </div>
      <CardHome categorias={categorias} />
    </div>
  );
};

export default MainHome;
