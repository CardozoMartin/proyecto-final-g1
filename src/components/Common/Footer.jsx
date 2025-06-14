import React from "react";
import { FaInstagramSquare, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <i className="bi bi-geo-alt-fill"></i>
      <p>Rivadavia 1041 - San Miguel de Tucuman</p>
      <footer className="footer-text">
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
  );
};

export default Footer;
