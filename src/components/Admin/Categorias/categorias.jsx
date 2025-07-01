import React, { useState } from 'react';
import FormCategorias from './FormCategorias';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias.jsx';
import Swal from 'sweetalert2';

const Categorias = () => {
  const { categorias, loading, error, obtenerCategorias, actualizarEstadoCategoria } = useCustomCategorias();

  const resultado = categorias.categorias || [];
  console.log('Resultado de categorías:', resultado);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [selectedCategoriasIds, setSelectedCategoriasIds] = useState([]);
  const [newEstado, setNewEstado] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategoriaDetails, setSelectedCategoriaDetails] = useState(null);

  // Estilos para los badges de estado
  const getStatusBadge = (estado) => {
    const badges = {
      activo: 'success',
      inactivo: 'danger'
    };
    return badges[estado] || 'secondary';
  };

  // Manejo de búsqueda
  const handleSearch = (event) => {
    setTerminoBusqueda(event.target.value);
    setSelectedCategoriasIds([]);
  };

  // Selección de una categoría
  const handleSelectCategoria = (idCat_productos) => {
    if (selectedCategoriasIds.includes(idCat_productos)) {
      setSelectedCategoriasIds(selectedCategoriasIds.filter((id) => id !== idCat_productos));
    } else {
      setSelectedCategoriasIds([...selectedCategoriasIds, idCat_productos]);
    }
  };

  // Seleccionar todas las categorías
  const handleSelectAll = () => {
    if (selectedCategoriasIds.length === filteredCategorias.length) {
      setSelectedCategoriasIds([]);
    } else {
      setSelectedCategoriasIds(filteredCategorias.map((cat) => cat.idCat_productos));
    }
  };

  // Cambiar estado de categorías seleccionadas
  const handleChangeEstado = async (estado) => {
    if (!estado || selectedCategoriasIds.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona al menos una categoría y un estado.',
        icon: 'error'
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Cambiar estado a ${estado}?`,
        text: `Se actualizará el estado de ${selectedCategoriasIds.length} categoría(s) a "${estado}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resultado = await actualizarEstadoCategoria(selectedCategoriasIds, estado);
            if (resultado.success) {
              await obtenerCategorias();
              swalWithBootstrapButtons.fire({
                title: '¡Éxito!',
                text: `Estados actualizados a "${estado}" correctamente.`,
                icon: 'success'
              });
              setSelectedCategoriasIds([]);
              setNewEstado('');
            } else {
              swalWithBootstrapButtons.fire({
                title: 'Error',
                text: `Error al actualizar los estados: ${resultado.error}`,
                icon: 'error'
              });
            }
          } catch (error) {
            console.error('Error al actualizar estados:', error);
            swalWithBootstrapButtons.fire({
              title: 'Error',
              text: 'Error al actualizar los estados. Intenta de nuevo.',
              icon: 'error'
            });
          }
        }
      });
  };

  // Manejo de visualización de categoría
  const handleView = (categoria) => {
    const categoriaDetalle = {
      id: categoria.idCat_productos,
      nombre: categoria.nombreCategoriaProductos,
      estado: categoria.estado,
      imagen: categoria.imagenCategoriaProductos || 'No disponible'
    };
    setSelectedCategoriaDetails(categoriaDetalle);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedCategoriaDetails(null);
  };

  // Filtrar categorías según el término de búsqueda
  const filteredCategorias = resultado.filter((cat) =>
    `${cat.idCat_productos} ${cat.nombreCategoriaProductos} ${cat.imagenCategoriaProductos || ''} ${cat.estado}`
      .toLowerCase()
      .includes(terminoBusqueda.toLowerCase())
  );

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
                <th>
                  <input
                    type="checkbox"
                    checked={selectedCategoriasIds.length === filteredCategorias.length && filteredCategorias.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategorias.map((cat) => (
                <tr key={cat.idCat_productos}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCategoriasIds.includes(cat.idCat_productos)}
                      onChange={() => handleSelectCategoria(cat.idCat_productos)}
                    />
                  </td>
                  <td>{cat.idCat_productos}</td>
                  <td>{cat.nombreCategoriaProductos}</td>
                  <td>
                    <span className={`badge bg-${getStatusBadge(cat.estado)}`}>
                      {cat.estado}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#categoriaModal"
                        onClick={() => setCategoriaSeleccionada(cat)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleView(cat)}
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
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Categorías</h5>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control form-control-sm me-2"
                placeholder="Buscar categoría..."
                value={terminoBusqueda}
                onChange={handleSearch}
                style={{ maxWidth: '200px' }}
              />
              {selectedCategoriasIds.length > 0 && (
                <div className="dropdown me-2">
                  <button
                    className="btn btn-warning btn-sm dropdown-toggle"
                    type="button"
                    id="bulkActionsDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Acciones ({selectedCategoriasIds.length})
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="bulkActionsDropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleChangeEstado('activo')}
                      >
                        Cambiar estado a Activo
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleChangeEstado('inactivo')}
                      >
                        Cambiar estado a Inactivo
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
          </div>
          {renderContent()}
        </div>
      </div>

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
              <FormCategorias categoria={categoriaSeleccionada} />
            </div>
          </div>
        </div>
      </div>

      {selectedCategoriaDetails && (
        <div
          className={`modal fade ${showViewModal ? 'show d-block' : ''}`}
          tabIndex="-1"
          aria-labelledby="viewCategoriaModalLabel"
          aria-hidden={!showViewModal}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark" id="viewCategoriaModalLabel">
                  Detalles de la Categoría {selectedCategoriaDetails.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseViewModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-dark">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Información General</h6>
                    <p>
                      <strong>ID:</strong> {selectedCategoriaDetails.id}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {selectedCategoriaDetails.nombre}
                    </p>
                    <p>
                      <strong>Estado:</strong>
                      <span className={`badge bg-${getStatusBadge(selectedCategoriaDetails.estado)}`}>
                        {selectedCategoriaDetails.estado}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Imagen</h6>
                    {selectedCategoriaDetails.imagen !== 'No disponible' ? (
                      <img
                        src={selectedCategoriaDetails.imagen}
                        alt={selectedCategoriaDetails.nombre}
                        className="img-fluid"
                        style={{ maxHeight: '200px' }}
                      />
                    ) : (
                      <p>No hay imagen disponible</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseViewModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showViewModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Categorias;