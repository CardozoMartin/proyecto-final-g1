import "../../css/CardHome.css"





const CardHome = ({ categorias }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        {categorias.map((cat) => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div className="card h-100 bg-dark text-white shadow-sm">
              {cat.imagen && (
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{cat.nombre}</h5>
                <p className="card-text">{cat.descripcion}</p>
                <a href="#" className="btn btn-item">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHome;
