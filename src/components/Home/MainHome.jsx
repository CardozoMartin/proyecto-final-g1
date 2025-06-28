import React from "react";
import { Card } from "react-bootstrap";
import CardHome from "./CardHome";
import { categorias } from "../../Data/categorias";

const MainHome = () => {
  return (
    <div>
     
      <div className="card text-white mb-5" style={{ border: "none", position: "relative", overflow: "hidden", height: "700px" }}>
        <video
          src="/portada.mp4"
          className="card-img"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%", // <-- Ajusta este valor para bajar el video
            filter: "brightness(50%)",
            zIndex: 1,
          }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center" style={{ position: "relative", zIndex: 2 }}>
          
          
        </div>
      </div>
      <CardHome categorias={categorias} />
    </div>
  );
};

export default MainHome;
