import React from "react";
import { FaInstagramSquare, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "../../css/Footer.css";

const Footer = () => {
    const sucursales = [
        {
            nombre:"Yerba Buena",
            ubicacion: "https://www.google.com/maps?q=26.8167,-65.3167",
        },
        {
            nombre:"San Miguel de Tucumán",
            ubicacion: "https://www.google.com/maps?q=26.8333,-65.2000",
        },
        {
            nombre:"Alderetes",
            ubicacion: "Ruta 307 Km 45",
        }, 
        {
            nombre:"Concepción",
            ubicacion: "https://www.google.com/maps?q=-26.9000,-65.1833",
        }
    ]
    const servicios = [
        {
            icon: "bi bi-box-seam",
            text: "Envios a Domicilio",
        },
        {
            icon: "bi bi-credit-card",
            text: "Pago con Tarjeta",
        },
        {
            icon: "bi bi-telephone-fill",
            text: "Asesoramiento personalizado",
        }
    ];

  return (
    <>
    <div className="servicios">
        { servicios.map((servicio, index) => (
          <div className="servicio-item" key={index}>
            <i className={servicio.icon}></i>
            <p>{servicio.text}</p>
          </div>
        )) }
        
      
    </div>
    <div className="footer-container">
      <i className="bi bi-geo-alt-fill"></i>
      <div className="footer">
{                sucursales.map((sucursal, index) => (
          <div key={index} className="sucursal">
            <a className="no-link-style" href={sucursal.ubicacion}><h5>{sucursal.nombre}</h5></a>
            
          </div>
        ))
      }
      </div>
      <footer className="footer">
      <a
        href="https://www.instagram.com/karenherrera.bd?igsh=MW9ncGgxNWRqeDhoNg=="
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        className="footer-icon"
      >
        <FaInstagramSquare />
      </a>
      <a
        href="https://www.facebook.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
        className="footer-icon"
      >
        <FaFacebook />
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=543813541077"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="footer-icon"
      >
        <FaWhatsapp />
      </a>
      </footer>
    </div>
    </>
  );
};

export default Footer;