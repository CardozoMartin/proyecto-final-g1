import React, { useState } from "react";
import FormProductos from "./FormProductos";
import useCustomProductos from "../../../CustomHooks/useCustomProductos";
import Swal from "sweetalert2";

const Productos = () => {
  // Destructuramos todos los valores del hook corregido
  const { productos, loading, error, eliminarProducto } = useCustomProductos();
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
        // eliminamos el prodcuto
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


//----------------------Estados de Carga y Error ----------------------
  //  Manejo del estado de carga
  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Cargando productos...
          </div>
        </div>
      </div>
    );
  }
  // Manejo del estado de error
  if (error) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-danger" role="alert">
            Error al cargar productos: {error}
          </div>
        </div>
      </div>
    );
  }
  // Estructura principal que siempre se renderiza
  const renderContent = () => {
    if (!productos || productos.length === 0) {
      return (
        <div className="card-body">
          <div className="alert alert-info" role="alert">
            No hay productos disponibles. ¡Agrega tu primer producto!
          </div>
        </div>
      );
    }

    return (
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
              {productos.productos.map((prod) => (
                <tr key={prod.idProductos}>
                  <td>
                    {prod.idProductos}
                  </td>
                  <td>{prod.nombre_producto}</td>
                  <td>{prod.descripcion}</td>
                  <td>
                    {prod.imagen ? (
                      <img
                        src={prod.imagen}
                        alt={prod.product}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      'Sin imagen'
                    )}
                  </td>
                  <td className="fw-bold">${prod.precio_venta}</td>
                  <td className="fw-bold">${prod.precio_costo}</td>
                  <td className="fw-bold">{prod.cantidad_producto}</td>
                  <td className="fw-bold">{prod.nombre_categoria}</td>
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
                      <button onClick={()=> handlerDeleteProducto(prod)} className="btn btn-outline-danger btn-sm">
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
    );
  };

  return (
    <div className="row">
      <div className="col-12">
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
          {renderContent()}
        </div>
      </div>

      {/* Modal para agregar/editar producto */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
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
    </div>
  );
};

export default Productos;