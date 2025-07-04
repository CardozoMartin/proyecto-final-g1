import React, { useState, useEffect } from "react";
import FormProductos from "./FormProductos";
import useCustomProductos from "../../../CustomHooks/useCustomProductos";
import Swal from "sweetalert2";

const Productos = () => {
  // Destructuramos todos los valores del hook corregido
  const { productos, loading, error, eliminarProducto, obtenerProductos } = useCustomProductos();
  const [openModal, setOpenModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const resultado = (productos.productos || []).slice().sort((a, b) => b.idProductos - a.idProductos);
  console.log("Resultado de productos:", resultado);

  // Estado para el producto seleccionado (para editar)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para refrescar la lista después de operaciones
  const refrescarLista = async () => {
    await obtenerProductos();
  };

  //---------------------Handlers---------------------
  const verProducto = (producto) => {
    setProductoSeleccionado(producto);
    setOpenModal(true);
  };

  const abrirModalAgregar = () => {
    setProductoSeleccionado(null);
    setOpenFormModal(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setOpenFormModal(true);
  };

  const cerrarModalForm = () => {
    setOpenFormModal(false);
    setProductoSeleccionado(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          {/* Estado de carga */}
          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Cargando productos...
            </div>
          )}

          {/* Estado de error */}
          {error && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Productos</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={abrirModalAgregar}
                >
                  Agregar nuevo Producto
                </button>
              </div>
              <div className="alert alert-danger" role="alert">
                Ocurrió un error al cargar los productos
              </div>
            </>
          )}

          {/* Estado normal - productos cargados correctamente */}
          {!loading && !error && (
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Productos</h5>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={abrirModalAgregar}
                >
                  Agregar nuevo Producto
                </button>
              </div>
              {/* Contenido de la tabla */}
              {!productos || productos.length === 0 ? (
                <div className="card-body">
                  <div className="alert alert-info" role="alert">
                    No hay productos disponibles. ¡Agrega tu primer producto!
                  </div>
                </div>
              ) : (
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>SKU</th>
                          <th>Producto</th>
                          <th>Descripción</th>
                          <th>Imagen</th>
                          <th>Precio</th>
                          <th>P.Costo</th>
                          <th>Stock</th>
                          <th>Categoria</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.map((prod) => (
                          <tr key={prod.idProductos}>
                            <td>
                              {prod.idProductos}
                            </td>
                            <td>{prod.nombreProducto}</td>
                            <td>{prod.descripcion}</td>
                            <td>
                              {prod.imagenProducto ? (
                                <img
                                  src={prod.imagenProducto}
                                  alt={prod.product}
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                              ) : (
                                'Sin imagen'
                              )}
                            </td>
                            <td className="fw-bold">${prod.precioVenta}</td>
                            <td className="fw-bold">${prod.precioCosto}</td>
                            <td className="fw-bold">{prod.cantidadProducto}</td>
                            <td className="fw-bold">{prod.nombreCategoriaProductos}</td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => abrirModalEditar(prod)}
                                >
                                  Editar
                                </button>
                                <button 
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => verProducto(prod)}
                                >
                                  Ver
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar producto */}
      {openFormModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          aria-labelledby="formModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-dark" id="formModalLabel">
                  {productoSeleccionado ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h1>
                <button
                  type="button"
                  className="btn btn-danger text-white ms-auto"
                  onClick={cerrarModalForm}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="modal-body">
                <FormProductos 
                  producto={productoSeleccionado} 
                  onSuccess={() => {
                    refrescarLista();
                    cerrarModalForm();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver producto */}
      {openModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          aria-labelledby="viewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg text-dark">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark" id="viewModalLabel">
                  {productoSeleccionado?.nombreProducto}
                </h5>
               <button
                  type="button"
                  className="btn btn-danger text-white ms-auto"
                  onClick={() => setOpenModal(false)}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={productoSeleccionado?.imagenProducto}
                  alt={productoSeleccionado?.nombreProducto}
                  className="img-fluid mb-3" 
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <p className="text-dark">{productoSeleccionado?.descripcion}</p>
                <p className="text-dark">
                  <strong>Precio:</strong> ${productoSeleccionado?.precioVenta}
                </p>
                <p className="text-dark">
                  <strong>Categoría:</strong> {productoSeleccionado?.nombreCategoriaProductos}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productos;