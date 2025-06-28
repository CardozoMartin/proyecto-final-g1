import React, { useState } from 'react';
import useCustomCart from '../../../CustomHooks/CustomCart/useCustomCart';
import axios from 'axios';

const Pedidos = () => {
   const { cart, refetch } = useCustomCart(); // Obtener cart y refetch (obtenerVentas)
   console.log('Cart:', cart);

   const resultadoPedidos = cart || [];

   const getStatusBadge = (estado) => {
      const badges = {
         Completada: 'success',
         Pendiente: 'warning',
         Cancelada: 'danger',
      };
      return badges[estado] || 'secondary';
   };

   const [terminoBusqueda, setTerminoBusqueda] = useState('');
   const [showModal, setShowModal] = useState(false);
   const [selectedPedido, setSelectedPedido] = useState(null);
   const [selectedPedidosIds, setSelectedPedidosIds] = useState([]);
   const [newEstado, setNewEstado] = useState('');

   const handleSearch = (event) => {
      setTerminoBusqueda(event.target.value);
      setSelectedPedidosIds([]);
   };

   const handleSelectPedido = (idVentas) => {
      console.log('Seleccionando pedido:', idVentas);
      if (selectedPedidosIds.includes(idVentas)) {
         setSelectedPedidosIds(selectedPedidosIds.filter((id) => id !== idVentas));
      } else {
         setSelectedPedidosIds([...selectedPedidosIds, idVentas]);
      }
      console.log('Nuevo selectedPedidosIds:', selectedPedidosIds);
   };

   const handleSelectAll = () => {
      console.log('Seleccionando todos los pedidos');
      if (selectedPedidosIds.length === filteredPedidos.length) {
         setSelectedPedidosIds([]);
      } else {
         setSelectedPedidosIds(filteredPedidos.map((pedido) => pedido.idVentas));
      }
      console.log('Nuevo selectedPedidosIds tras seleccionar todos:', selectedPedidosIds);
   };

   const API_URL = import.meta.env.VITE_API_URL;

   const handleChangeEstado = async (estado) => {
      console.log('Estado seleccionado:', estado);
      console.log('IDs seleccionados:', selectedPedidosIds);
      if (!estado || selectedPedidosIds.length === 0) {
         alert('Por favor, selecciona al menos un pedido y un estado.');
         return;
      }

      try {
         const updatePromises = selectedPedidosIds.map((id) =>
            axios.put(`${API_URL}/api/ventas/${id}`, { estadoVentas: estado })
         );
         const responses = await Promise.all(updatePromises);
         console.log('Respuestas del servidor:', responses.map((res) => res.data));

         if (refetch) {
            refetch();
         } else {
            console.warn('No se encontró refetch, actualizando localmente');
            const updatedPedidos = resultadoPedidos.map((pedido) =>
               selectedPedidosIds.includes(pedido.idVentas)
                  ? { ...pedido, estadoVentas: estado }
                  : pedido
            );
            // Nota: Actualizar cart manualmente si no hay refetch
            // setCart(updatedPedidos); // Descomentar si usas setCart desde useCustomCart
         }

         alert('Estados actualizados correctamente');
         setSelectedPedidosIds([]);
         setNewEstado('');
      } catch (error) {
         console.error('Error al actualizar estados:', error);
         if (error.response) {
            console.error('Respuesta del servidor:', error.response.status, error.response.data);
         } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
         } else {
            console.error('Error en la configuración de la solicitud:', error.message);
         }
         alert('Error al actualizar los estados. Intenta de nuevo.');
      }
   };

   const handleView = (pedido) => {
      const pedidoDetalle = {
         id: pedido.idVentas,
         cliente: `${pedido.nombreCliente} ${pedido.apellidoCliente || ''}`,
         fecha: pedido.fechaVenta,
         estado: pedido.estadoVentas,
         monto: pedido.totalVenta,
         direccion: pedido.direccionCliente || '',
         provincia: pedido.provinciaCliente || 'No especificado',
         codigoPostal: pedido.codigoPostalCliente || 'No especificado',
         metodoPago: pedido.metodoPago || 'No especificado',
         tipoEntrega: pedido.tipoEntrega || 'Retiro',
         direccionEnvio: pedido.direccionEnvio || 'No especificado',
         productos: (pedido.productos || []).map((prod) => ({
            nombre: prod.nombreProducto || 'Sin nombre',
            cantidad: prod.cantidad,
            precioUnitario: prod.precioUnitario || 0,
            subtotal: prod.subtotal || prod.cantidad * prod.precioUnitario || 0,
         })),
      };
      setSelectedPedido(pedidoDetalle);
      setShowModal(true);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setSelectedPedido(null);
   };

   // Filtrar pedidos según el término de búsqueda
   const filteredPedidos = resultadoPedidos.filter((pedido) =>
      `${pedido.idVentas} ${pedido.nombreCliente} ${pedido.apellidoCliente || ''} ${pedido.fechaVenta} ${
         pedido.estadoVentas
      } ${pedido.totalVenta} ${pedido.direccionCliente || ''} ${pedido.provinciaCliente || ''} ${
         pedido.codigoPostalCliente || ''
      } ${pedido.metodoPago || ''} ${pedido.tipoEntrega || ''} ${pedido.direccionEnvio || ''} ${
         (pedido.productos || []).map((p) => p.nombreProducto || '').join(' ')
      }`
         .toLowerCase()
         .includes(terminoBusqueda.toLowerCase())
   );

   return (
      <div className="row">
         <div className="col-12">
            <div className="card shadow-sm border-0">
               <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Pedidos Recientes</h5>
                  <div className="d-flex align-items-center">
                     <input
                        type="text"
                        className="form-control form-control-sm me-2"
                        placeholder="Buscar pedido..."
                        value={terminoBusqueda}
                        onChange={handleSearch}
                        style={{ maxWidth: '200px' }}
                     />
                     {selectedPedidosIds.length > 0 && (
                        <div className="dropdown me-2">
                           <button
                              className="btn btn-warning btn-sm dropdown-toggle"
                              type="button"
                              id="bulkActionsDropdown"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              Acciones ({selectedPedidosIds.length})
                           </button>
                           <ul className="dropdown-menu" aria-labelledby="bulkActionsDropdown">
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeEstado('Completada')}
                                 >
                                    Cambiar estado a Completada
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeEstado('Pendiente')}
                                 >
                                    Cambiar estado a Pendiente
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeEstado('Cancelada')}
                                 >
                                    Cambiar estado a Cancelada
                                 </button>
                              </li>
                           </ul>
                        </div>
                     )}
                     <button className="btn btn-primary btn-sm">Nuevo Pedido</button>
                  </div>
               </div>
               <div className="card-body">
                  <div className="table-responsive">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th>
                                 <input
                                    type="checkbox"
                                    checked={selectedPedidosIds.length === filteredPedidos.length && filteredPedidos.length > 0}
                                    onChange={handleSelectAll}
                                 />
                              </th>
                              <th>Cliente</th>
                              <th>Fecha</th>
                              <th>Estado</th>
                              <th>Monto</th>
                              <th>Facturación</th>
                              <th>Entrega</th>
                              <th>Acciones</th>
                           </tr>
                        </thead>
                        <tbody>
                           {filteredPedidos.map((pedido) => (
                              <tr key={pedido.idVentas}>
                                 <td>
                                    <input
                                       type="checkbox"
                                       checked={selectedPedidosIds.includes(pedido.idVentas)}
                                       onChange={() => handleSelectPedido(pedido.idVentas)}
                                    />
                                 </td>
                                 <td>
                                    <code>{pedido.idClientes}</code> {pedido.nombreCliente}{' '}
                                    {pedido.apellidoCliente || ''}
                                 </td>
                                 <td>{pedido.fechaVenta}</td>
                                 <td>
                                    <span className={`badge bg-${getStatusBadge(pedido.estadoVentas)}`}>
                                       {pedido.estadoVentas}
                                    </span>
                                 </td>
                                 <td className="fw-bold">{pedido.totalVenta}</td>
                                 <td>
                                    <div>
                                       <strong>
                                          {pedido.nombreCliente} {pedido.apellidoCliente || ''}
                                       </strong>
                                       <br />
                                       {pedido.emailCliente}, {pedido.telefonoCliente}
                                       <br />
                                       {pedido.direccionCliente || ''}, {pedido.provinciaCliente || ''}
                                       <br />
                                       CP: {pedido.codigoPostalCliente || ''}
                                    </div>
                                 </td>
                                 <td>
                                    <div>
                                       {pedido.tipoEntrega === 'Retiro' ? (
                                          <span>Retiro en local</span>
                                       ) : (
                                          <span>Envío: <br /> {pedido.direccionEnvio || ''}</span>
                                       )}
                                    </div>
                                 </td>
                                 <td>
                                    <div className="btn-group" role="group">
                                       <button
                                          className="btn btn-outline-primary btn-sm"
                                          onClick={() => handleView(pedido)}
                                       >
                                          Ver
                                       </button>
                                       <button className="btn btn-outline-secondary btn-sm">Editar</button>
                                       <button className="btn btn-outline-danger btn-sm">Borrar</button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         {selectedPedido && (
            <div
               className={`modal fade ${showModal ? 'show d-block' : ''}`}
               tabIndex="-1"
               aria-labelledby="pedidoModalLabel"
               aria-hidden={!showModal}
            >
               <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title text-dark" id="pedidoModalLabel">
                           Detalles del Pedido {selectedPedido.id}
                        </h5>
                        <button
                           type="button"
                           className="btn-close"
                           onClick={handleCloseModal}
                           aria-label="Close"
                        ></button>
                     </div>
                     <div className="modal-body text-dark">
                        <div className="row">
                           <div className="col-md-6">
                              <h6>Información General</h6>
                              <p>
                                 <strong>ID:</strong> {selectedPedido.id}
                              </p>
                              <p>
                                 <strong>Cliente:</strong> {selectedPedido.cliente}
                              </p>
                              <p>
                                 <strong>Fecha:</strong> {selectedPedido.fecha}
                              </p>
                              <p>
                                 <strong>Estado:</strong>
                                 <span
                                    className={`badge bg-${getStatusBadge(selectedPedido.estado)}`}
                                 >
                                    {selectedPedido.estado}
                                 </span>
                              </p>
                              <p>
                                 <strong>Monto Total:</strong> {selectedPedido.monto}
                              </p>
                           </div>
                           <div className="col-md-6">
                              <h6>Facturación</h6>
                              <p>
                                 <strong>Dirección:</strong> {selectedPedido.direccion},{' '}
                                 {selectedPedido.provincia}
                              </p>
                              <p>
                                 <strong>Código Postal:</strong> {selectedPedido.codigoPostal}
                              </p>
                              <p>
                                 <strong>Método de Pago:</strong> {selectedPedido.metodoPago}
                              </p>
                           </div>
                        </div>
                        <div className="row mt-3">
                           <div className="col-12">
                              <h6>Entrega</h6>
                              <p>
                                 <strong>Tipo:</strong>{' '}
                                 {selectedPedido.tipoEntrega === 'Retiro'
                                    ? 'Retiro en local'
                                    : `Envío a ${selectedPedido.direccionEnvio}`}
                              </p>
                           </div>
                        </div>
                        <div className="row mt-3">
                           <div className="col-12">
                              <h6>Productos</h6>
                              <table className="table table-bordered">
                                 <thead>
                                    <tr>
                                       <th>Producto</th>
                                       <th>Cantidad</th>
                                       <th>Precio Unitario</th>
                                       <th>Subtotal</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {selectedPedido.productos.map((producto, index) => (
                                       <tr key={index}>
                                          <td>{producto.nombre}</td>
                                          <td>{producto.cantidad}</td>
                                          <td>${producto.precioUnitario}</td>
                                          <td>${producto.subtotal}</td>
                                       </tr>
                                    ))}
                                    <tr>
                                       <td colSpan="3" className="text-end">
                                          <strong>Total</strong>
                                       </td>
                                       <td>
                                          <strong>{selectedPedido.monto}</strong>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           onClick={handleCloseModal}
                        >
                           Cerrar
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
         {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
   );
};

export default Pedidos;