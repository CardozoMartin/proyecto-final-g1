import React, { useState } from 'react'
import useCustomCart from '../../../CustomHooks/CustomCart/useCustomCart';

const Pedidos = () => {

   const { cart} = useCustomCart()
   console.log(cart)

   const resultadoPedidos = cart || [];
  

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
   const [showModal, setShowModal] = useState(false);
   const [selectedPedido, setSelectedPedido] = useState(null);

   const handleSearch = (event) => {
      setTerminoBusqueda(event.target.value);
   };

   const handleView = (pedido) => {
      // Mapea los campos del pedido a los que espera el modal
      const pedidoDetalle = {
         id: pedido.idVentas,
         cliente: pedido.nombreCliente,
         fecha: pedido.fechaVenta,
         estado: pedido.estadoVentas,
         monto: pedido.subtotal,
         direccion: pedido.direccionCliente || pedido.direccion || "",
         provincia: pedido.provinciaCliente || pedido.provincia || "",
         codigoPostal: pedido.codigoPostalCliente || pedido.codigoPostal || "",
         metodoPago: pedido.metodoPago || "No especificado",
         tipoEntrega: pedido.tipoEntrega || "Retiro",
         direccionEnvio: pedido.direccionEnvio || "",
         productos: (pedido.productos || []).map(prod => ({
            nombre: prod.nombreProducto || prod.nombre || "",
            cantidad: prod.cantidad,
            precioUnitario: prod.precioUnitario || prod.precioVenta || "",
            subtotal: prod.subtotal || (prod.cantidad && prod.precioUnitario ? prod.cantidad * prod.precioUnitario : "")
         }))
      };
      setSelectedPedido(pedidoDetalle);
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
                        
                        style={{ maxWidth: '200px' }}
                     />
                    
                     <button className="btn btn-primary btn-sm">Nuevo Pedido</button>
                  </div>
               </div>
               <div className="card-body">
                  <div className="table-responsive">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th>
                                 
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
                           {resultadoPedidos.map((pedido) => (
                              <tr key={pedido.idVentas}>
                                 
                                 <td>
                                    <code>{pedido.idCliente}</code> {pedido.nombreCliente}
                                 </td>
                                 <td>{pedido.fechaVenta}</td>
                                 <td>
                                    <span className={`badge bg-${(pedido.estado)}`}>
                                       {pedido.estadoVentas}
                                    </span>
                                 </td>
                                 <td className="fw-bold">{pedido.subtotal}</td>
                                 <td>
                                    <div>
                                       <strong>{pedido.nombreCliente}</strong><br />
                                       {pedido.emailCliente}, {pedido.telefonoCliente}<br />
                                      
                                    </div>
                                 </td>
                                 <td>
                                    <div>
                                       
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
                        <h5 className="modal-title text-dark" id="pedidoModalLabel">Detalles del Pedido {selectedPedido.id}</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                     </div>
                     <div className="modal-body text-dark">
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