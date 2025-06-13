import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#f7ca0b' }}>
        <div className="container">
          <a className="navbar-brand" href="/" style={{ color: '#000000' }}>
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

      <div className="card text-white mb-5" style={{ border: 'none' }}>
        <img
          src="/herramienta.jpg"
          className="card-img"
          alt="Herramientas"
          style={{ filter: 'brightness(50%)', height: '500px', objectFit: 'cover' }}
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-4" style={{ color: '#ffffff' }}>
            <i className="bi bi-wrench me-2" aria-hidden="true"></i> Bienvenidos a Ferretería "Aura"
          </h1>
          <p className="lead" style={{ color: '#ffffff' }}>
            Todo lo que necesitas para tus proyectos de construcción y hogar.
          </p>
          <a
            href="#"
            className="btn btn-lg"
            style={{ backgroundColor: '#f7ca0b', color: '#000000', borderColor: '#000000' }}
          >
            Explorar Productos
          </a>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#000000' }}>
          Nuestras Categorías
        </h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card mb-4 h-100">
              <img
                src="/manuales.jpg"
                className="card-img-top"
                alt="Herramientas Manuales"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ color: '#000000' }}>
                  Herramientas Manuales
                </h5>
                <p className="card-text flex-grow-1" style={{ color: '#000000' }}>
                  Martillos, destornilladores y más.
                </p>
                <a
                  href="#"
                  className="btn mt-auto"
                  style={{ backgroundColor: '#f7ca0b', color: '#000000', borderColor: '#000000' }}
                >
                  Ver Más
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 h-100">
              <img
                src="/electrica.jpg"
                className="card-img-top"
                alt="Herramientas Eléctricas"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ color: '#000000' }}>
                  Herramientas Eléctricas
                </h5>
                <p className="card-text flex-grow-1" style={{ color: '#000000' }}>
                  Taladros, sierras y más.
                </p>
                <a
                  href="#"
                  className="btn mt-auto"
                  style={{ backgroundColor: '#f7ca0b', color: '#000000', borderColor: '#000000' }}
                >
                  Ver Más
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 h-100">
              <img
                src="/pintura.jpg"
                className="card-img-top"
                alt="Pinturas"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ color: '#000000' }}>
                  Pinturas
                </h5>
                <p className="card-text flex-grow-1" style={{ color: '#000000' }}>
                  Colores para tus espacios.
                </p>
                <a
                  href="#"
                  className="btn mt-auto"
                  style={{ backgroundColor: '#f7ca0b', color: '#000000', borderColor: '#000000' }}
                >
                  Ver Más
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-4 h-100">
              <img
                src="/fontaneria2.jpg"
                className="card-img-top"
                alt="Fontanería"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ color: '#000000' }}>
                  Fontanería
                </h5>
                <p className="card-text flex-grow-1" style={{ color: '#000000' }}>
                  Tuberías, llaves y accesorios.
                </p>
                <a
                  href="#"
                  className="btn mt-auto"
                  style={{ backgroundColor: '#f7ca0b', color: '#000000', borderColor: '#000000' }}
                >
                  Ver Más
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

