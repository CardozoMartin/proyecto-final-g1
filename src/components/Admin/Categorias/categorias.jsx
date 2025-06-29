import React, { useState } from 'react';
import FormCategorias from './FormCategorias';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias.jsx';
import Swal from 'sweetalert2';

const Categorias = () => {
  // Destructuramos todos los valores del hook
  const { categorias, loading, error, eliminarCategoria } = useCustomCategorias();

  const resultado = categorias.categorias || [];
  console.log('Resultado de categorías:', resultado);
  // Estado para la categoría seleccionada (para editar)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  //---------------------Handlers---------------------
  const handlerDeleteCategoria = (cat) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: '¡Eliminado!',
            text: 'La categoría ha sido eliminada.',
            icon: 'success'
          });
          // Eliminamos la categoría
          eliminarCategoria(cat.idCat_productos);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'La categoría está a salvo :)',
            icon: 'error'
          });
        }
      });
  };

  //----------------------Estados de Carga y Error ----------------------
  // Manejo del estado de carga
  if (loading) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="alert alert-info" role="alert">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Cargando categorías...
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
            Error al cargar categorías: {error}
          </div>
        </div>
      </div>
    );
  }
  // Estructura principal que siempre se renderiza
  const renderContent = () => {
    if (!resultado || resultado.length === 0) {
      return (
        <div className="card-body">
          <div className="alert alert-info" role="alert">
            No hay categorías disponibles. ¡Agrega tu primera categoría!
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
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((cat) => (
                <tr key={cat.idCat_productos}>
                  <td>{cat.idCat_productos}</td>
                  <td>{cat.nombreCategoriaProductos}</td>
                  <td>
                    <div className="btn-group" role="group">
                      {/* Al hacer click en Editar, guardamos la categoría y abrimos el modal */}
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#categoriaModal"
                        onClick={() => setCategoriaSeleccionada(cat)}
                      >
                        Editar
                      </button>
                      <button className="btn btn-outline-primary btn-sm">Ver</button>
                      <button
                        onClick={() => handlerDeleteCategoria(cat)}
                        className="btn btn-outline-danger btn-sm"
                      >
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
            <h5 className="card-title mb-0">Categorías</h5>
            {/* Al agregar nueva categoría, limpiamos la categoría seleccionada */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#categoriaModal"
              onClick={() => setCategoriaSeleccionada(null)}
            >
              Agregar nueva Categoría
            </button>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Modal para agregar/editar categoría */}
      <div
        className="modal fade"
        id="categoriaModal"
        tabIndex="-1"
        aria-labelledby="categoriaModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="categoriaModalLabel">
                {/* Cambia el título según si es edición o nuevo */}
                {categoriaSeleccionada ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Pasamos la categoría seleccionada al formulario */}
              <FormCategorias categoria={categoriaSeleccionada} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorias;