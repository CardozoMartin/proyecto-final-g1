import React, { useState } from "react";
import FormProductos from "./FormProductos";
import useCustomProductos from "../../../CustomHooks/useCustomProductos";
import Swal from "sweetalert2";

const Productos = () => {
  // Destructuramos todos los valores del hook corregido
  const { productos, loading, error, eliminarProducto } = useCustomProductos();

  const resultado = productos.productos;
  console.log("Resultado de productos:", resultado);
  
  // Estado para el producto seleccionado (para editar)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  //---------------------Handlers---------------------
  const handlerDeleteProducto = (prod) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        // eliminamos el producto
        eliminarProducto(prod.idProductos)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }



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
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setProductoSeleccionado(null)}
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
                {/* Al agregar nuevo producto, limpiamos el producto seleccionado */}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setProductoSeleccionado(null)}
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
                                {/* Al hacer click en Editar, guardamos el producto y abrimos el modal */}
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  onClick={() => setProductoSeleccionado(prod)}
                                >
                                  Editar
                                </button>
                                <button className="btn btn-outline-primary btn-sm">
                                  Ver
                                </button>
                                <button onClick={() => handlerDeleteProducto(prod)} className="btn btn-outline-danger btn-sm">
                                  Eliminar
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

      {/* Modal para agregar/editar producto - Siempre disponible */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">
                {/* Cambia el título según si es edición o nuevo */}
                {productoSeleccionado ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Pasamos el producto seleccionado al formulario */}
              <FormProductos producto={productoSeleccionado} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productos;