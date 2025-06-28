import React from "react";
import { Card } from "react-bootstrap";
import CardHome from "./CardHome";
import { categorias } from "../../Data/categorias";

const MainHome = () => {
  return (
    <div>
     
      <div className="card text-white mb-5 border-0 position-relative overflow-hidden">
        <div className="ratio ratio-16x9" style={{ minHeight: "300px" }}>
          <video
            src="/portada.mp4"
            className="w-100 h-100"
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: "brightness(50%)",
            }}
          />
        </div>
        {/* Aquí puedes agregar overlays o contenido adicional si lo necesitas */}
      </div>
      <CardHome categorias={categorias} />
    </div>
  );
};



export default MainHome;
