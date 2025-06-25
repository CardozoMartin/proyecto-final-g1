import React from 'react'
import useCustomProductos from '../CustomHooks/useCustomProductos';

const ProductosPage = () => {

    const { productos } = useCustomProductos();

    const resultadoProductos = productos.productos || [];
    return (
        <div className="container-fluid py-4">
            <div className="row">
                {/* Sidebar de Filtros */}
                <div className="col-lg-3 col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-filter me-2"></i>
                                Filtros
                            </h5>
                        </div>
                        <div className="card-body">
                            {/* Filtro por Categoría */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3">Categorías</h6>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="categoria1" />
                                    <label className="form-check-label" htmlFor="categoria1">
                                        Herramientas y Construcción
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="categoria2" />
                                    <label className="form-check-label" htmlFor="categoria2">
                                        Griferia
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="categoria3" />
                                    <label className="form-check-label" htmlFor="categoria3">
                                        Puertas
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="categoria4" />
                                    <label className="form-check-label" htmlFor="categoria4">
                                        Ventanas
                                    </label>
                                </div>
                                <div className="form-check mb-2">
                                    <input className="form-check-input" type="checkbox" id="categoria5" />
                                    <label className="form-check-label" htmlFor="categoria5">
                                        Lamparas y Iluminación
                                    </label>
                                </div>
                            </div>

                            {/* Filtro por Precio */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3">Rango de Precio</h6>
                                <div className="mb-3">
                                    <label htmlFor="precioMin" className="form-label">Precio Mínimo</label>
                                    <input type="range" className="form-range" id="precioMin" min="0" max="1000" />
                                    <small className="text-muted">$0 - $1000</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precioMax" className="form-label">Precio Máximo</label>
                                    <input type="range" className="form-range" id="precioMax" min="0" max="1000" />
                                    <small className="text-muted">$0 - $1000</small>
                                </div>
                            </div>

                            {/* Botones de Filtro */}
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">
                                    <i className="fas fa-search me-2"></i>
                                    Aplicar Filtros
                                </button>
                                <button className="btn btn-outline-secondary">
                                    <i className="fas fa-times me-2"></i>
                                    Limpiar Filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área de Productos */}
                <div className="col-lg-9 col-md-8">
                    {/* Header de productos */}
                    

                    {/* Grid de Productos */}
                    <div className="row g-4">

                        {resultadoProductos.map((producto, index) => (

                            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                                        <img
                                            src={producto.imagenProducto || "error al cargar imagen"}
                                            className="card-img-top w-100 h-100"
                                            alt={producto.nombreProducto}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <div className="mb-3">
                                            <h5 className="card-title fw-bold mb-2">
                                                {producto.nombreProducto}
                                            </h5>
                                            <p className="card-text text-muted small mb-0">
                                                {producto.descripcion}
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="h5 text-primary fw-bold mb-0">
                                                        ${producto.precioVenta}
                                                    </span>
                                                </div>
                                                <button className="btn btn-primary btn-sm">
                                                    <i className="fas fa-cart-plus me-1"></i>
                                                    Agregar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                        }


                    </div>

                    {/* Paginación */}
                    <nav aria-label="Navegación de productos" className="mt-5">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <span className="page-link">Anterior</span>
                            </li>
                            <li className="page-item active">
                                <span className="page-link">1</span>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ProductosPage