import React, { useState } from 'react'

const Pedidos = () => {
   const [recentOrders, setRecentOrders] = useState([
      {
         id: '#001',
         cliente: 'Juan Pérez',
         monto: '$1,299',
         estado: 'Completado',
         fecha: '2025-06-15',
         provincia: 'Buenos Aires',
         direccion: 'Av. Corrientes 1234',
         codigoPostal: 'C1043',
         metodoPago: 'Tarjeta de Crédito',
         tipoEntrega: 'Retiro',
         productos: [
            { nombre: 'Taladro Eléctrico 500W', cantidad: 1, precioUnitario: 999, subtotal: 999 },
            { nombre: 'Caja de Tornillos 3mm x 50', cantidad: 2, precioUnitario: 150, subtotal: 300 }
         ]
      },
      {
         id: '#002',
         cliente: 'María García',
         monto: '$699',
         estado: 'En espera',
         fecha: '2025-06-14',
         provincia: 'Córdoba',
         direccion: 'Calle San Martín 567',
         codigoPostal: 'X5000',
         metodoPago: 'Transferencia Bancaria',
         tipoEntrega: 'Envio',
         direccionEnvio: 'Av. Colón 789, Córdoba, X5000',
         productos: [
            { nombre: 'Lata de Pintura Acrílica 4L', cantidad: 1, precioUnitario: 699, subtotal: 699 }
         ]
      },
      {
         id: '#003',
         cliente: 'Carlos López',
         monto: '$399',
         estado: 'Procesando',
         fecha: '2025-06-13',
         provincia: 'Santa Fe',
         direccion: 'Bv. Pellegrini 890',
         codigoPostal: 'S2000',
         metodoPago: 'Tarjeta de Débito',
         tipoEntrega: 'Retiro',
         productos: [
            { nombre: 'Llave Inglesa 8"', cantidad: 1, precioUnitario: 399, subtotal: 399 }
         ]
      },
      {
         id: '#004',
         cliente: 'Ana Martínez',
         monto: '$199',
         estado: 'Completado',
         fecha: '2025-06-12',
         provincia: 'Mendoza',
         direccion: 'Ruta 7 Km 432',
         codigoPostal: 'M5500',
         metodoPago: 'Efectivo',
         tipoEntrega: 'Envio',
         direccionEnvio: 'Calle San Juan 456, Mendoza, M5500',
         productos: [
            { nombre: 'Juego de Destornilladores 6 Piezas', cantidad: 1, precioUnitario: 199, subtotal: 199 }
         ]
      },
      {
         id: '#005',
         cliente: 'Luis Rodríguez',
         monto: '$299',
         estado: 'Cancelado',
         fecha: '2025-06-11',
         provincia: 'Tucumán',
         direccion: 'Av. Mate de Luna 345',
         codigoPostal: 'T4000',
         metodoPago: 'Tarjeta de Crédito',
         tipoEntrega: 'Retiro',
         productos: [
            { nombre: 'Cinta Métrica 5m', cantidad: 1, precioUnitario: 299, subtotal: 299 }
         ]
      }
   ]);

   const getStatusBadge = (estado) => {
      const badges = {
         'Completado': 'success',
         'En espera': 'warning',
         'Procesando': 'info',
         'Cancelado': 'danger'
      };
      return badges[estado] || 'secondary';
   };

   const [terminoBusqueda, setTerminoBusqueda] = useState('');
   const [selectedOrders, setSelectedOrders] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedPedido, setSelectedPedido] = useState(null);

   const handleSearch = (event) => {
      setTerminoBusqueda(event.target.value);
      setSelectedOrders([]);
   };

   const filteredOrders = recentOrders.filter((pedido) =>
      `${pedido.id} ${pedido.cliente} ${pedido.provincia} ${pedido.direccion} ${pedido.codigoPostal} ${pedido.metodoPago} ${pedido.tipoEntrega} ${pedido.direccionEnvio || ''} ${pedido.productos.map(p => p.nombre).join(' ')}`
         .toLowerCase()
         .includes(terminoBusqueda.toLowerCase())
   );

   const handleSelectOrder = (id) => {
      if (selectedOrders.includes(id)) {
         setSelectedOrders(selectedOrders.filter((orderId) => orderId !== id));
      } else {
         setSelectedOrders([...selectedOrders, id]);
      }
   };

   const handleSelectAll = () => {
      if (selectedOrders.length === filteredOrders.length) {
         setSelectedOrders([]);
      } else {
         setSelectedOrders(filteredOrders.map((pedido) => pedido.id));
      }
   };

   const handleTrash = () => {
      if (window.confirm(`¿Confirmas que deseas enviar ${selectedOrders.length} pedido(s) a la papelera?`)) {
         setRecentOrders(recentOrders.filter((pedido) => !selectedOrders.includes(pedido.id)));
         setSelectedOrders([]);
      }
   };

   const handleChangeStatus = (nuevoEstado) => {
      setRecentOrders(
         recentOrders.map((pedido) =>
            selectedOrders.includes(pedido.id) ? { ...pedido, estado: nuevoEstado } : pedido
         )
      );
      setSelectedOrders([]);
   };

   const handleView = (pedido) => {
      setSelectedPedido(pedido);
      setShowModal(true);
   };

   const handleCloseModal = () => {
      setShowModal(false);
      setSelectedPedido(null);
   };

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
                     {selectedOrders.length > 0 && (
                        <div className="dropdown me-2">
                           <button
                              className="btn btn-warning btn-sm dropdown-toggle"
                              type="button"
                              id="bulkActionsDropdown"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              Acciones ({selectedOrders.length})
                           </button>
                           <ul className="dropdown-menu" aria-labelledby="bulkActionsDropdown">
                              <li>
                                 <button className="dropdown-item" onClick={handleTrash}>
                                    Enviar a papelera
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeStatus('Completado')}
                                 >
                                    Cambiar estado a Completado
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeStatus('En espera')}
                                 >
                                    Cambiar estado a En espera
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeStatus('Procesando')}
                                 >
                                    Cambiar estado a Procesando
                                 </button>
                              </li>
                              <li>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => handleChangeStatus('Cancelado')}
                                 >
                                    Cambiar estado a Cancelado
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
                                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                    onChange={handleSelectAll}
                                 />
                              </th>
                              <th>Pedido</th>
                              <th>Fecha</th>
                              <th>Estado</th>
                              <th>Monto</th>
                              <th>Facturación</th>
                              <th>Entrega</th>
                              <th>Acciones</th>
                           </tr>
                        </thead>
                        <tbody>
                           {filteredOrders.map((pedido) => (
                              <tr key={pedido.id}>
                                 <td>
                                    <input
                                       type="checkbox"
                                       checked={selectedOrders.includes(pedido.id)}
                                       onChange={() => handleSelectOrder(pedido.id)}
                                    />
                                 </td>
                                 <td>
                                    <code>{pedido.id}</code> {pedido.cliente}
                                 </td>
                                 <td>{pedido.fecha}</td>
                                 <td>
                                    <span className={`badge bg-${getStatusBadge(pedido.estado)}`}>
                                       {pedido.estado}
                                    </span>
                                 </td>
                                 <td className="fw-bold">{pedido.monto}</td>
                                 <td>
                                    <div>
                                       <strong>{pedido.cliente}</strong><br />
                                       {pedido.direccion}, {pedido.provincia}<br />
                                       CP: {pedido.codigoPostal}<br />
                                       Pago: {pedido.metodoPago}
                                    </div>
                                 </td>
                                 <td>
                                    <div>
                                       {pedido.tipoEntrega === 'Retiro' ? (
                                          <span>Retiro en local</span>
                                       ) : (
                                          <span>
                                             Envío: <br /> {pedido.direccionEnvio}
                                          </span>
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
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="pedidoModalLabel" aria-hidden={!showModal}>
               <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="pedidoModalLabel">Detalles del Pedido {selectedPedido.id}</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                     </div>
                     <div className="modal-body">
                        <div className="row">
                           <div className="col-md-6">
                              <h6>Información General</h6>
                              <p><strong>ID:</strong> {selectedPedido.id}</p>
                              <p><strong>Cliente:</strong> {selectedPedido.cliente}</p>
                              <p><strong>Fecha:</strong> {selectedPedido.fecha}</p>
                              <p>
                                 <strong>Estado:</strong>
                                 <span className={`badge bg-${getStatusBadge(selectedPedido.estado)} ms-2`}>
                                    {selectedPedido.estado}
                                 </span>
                              </p>
                              <p><strong>Monto Total:</strong> {selectedPedido.monto}</p>
                           </div>
                           <div className="col-md-6">
                              <h6>Facturación</h6>
                              <p><strong>Dirección:</strong> {selectedPedido.direccion}, {selectedPedido.provincia}</p>
                              <p><strong>Código Postal:</strong> {selectedPedido.codigoPostal}</p>
                              <p><strong>Método de Pago:</strong> {selectedPedido.metodoPago}</p>
                           </div>
                        </div>
                        <div className="row mt-3">
                           <div className="col-12">
                              <h6>Entrega</h6>
                              <p>
                                 <strong>Tipo:</strong> {selectedPedido.tipoEntrega === 'Retiro' ? 'Retiro en local' : `Envío a ${selectedPedido.direccionEnvio}`}
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
                                       <td colSpan="3" className="text-end"><strong>Total</strong></td>
                                       <td><strong>{selectedPedido.monto}</strong></td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                     </div>
                  </div>
               </div>
            </div>
         )}
         {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
   )
}

export default Pedidos