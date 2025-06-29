import React from "react";
import CardHome from "./CardHome";
import useCustomCategorias from "../../CustomHooks/useCustomCategorias";

const MainHome = () => {
  const { categorias, loading, error } = useCustomCategorias();

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
      </div>

      {loading && <p>Cargando categorías...</p>}
      {error && <p>Error al cargar categorías: {error}</p>}

      {!loading && !error && (
        <CardHome categorias={categorias.categorias} />
      )}
    </div>
  );
};

export default MainHome;
