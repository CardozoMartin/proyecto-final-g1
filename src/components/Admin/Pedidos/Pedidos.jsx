import React, { useState } from 'react';
import useCustomCart from '../../../CustomHooks/CustomCart/useCustomCart';

const Pedidos = () => {
   const { cart, obtenerVentas } = useCustomCart();
   const [openModal, setOpenModal] = useState(false);
   console.log('Pedidos:', cart);

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
   const [selectedPedido, setSelectedPedido] = useState(null);

   const handleSearch = (event) => {
      setTerminoBusqueda(event.target.value);
   };

   const handleView = (pedido) => {
      console.log('Ver pedido:', pedido);
      const pedidoDetalle = {
         // Datos del pedido
         idVentas: pedido.idVentas,
         fechaVenta: pedido.fechaVenta,
         estadoVentas: pedido.estadoVentas,
         totalVenta: pedido.subtotal,
         subtotal: pedido.subtotal,
         
         // Datos del cliente
         idCliente: pedido.idCliente,
         nombreCliente: pedido.nombreCliente,
         apellidoCliente: pedido.apellidoCliente || "",
         emailCliente: pedido.emailCliente,
         telefonoCliente: pedido.telefonoCliente,
         domicilioCliente: pedido.direccionCliente || pedido.direccion || "",
         
         // Datos del empleado
         nombreEmpleado: pedido.nombreEmpleado || "",
         apellidoEmpleado: pedido.apellidoEmpleado || "",
         
         // Datos del producto principal (si es un producto único)
         nombreProducto: pedido.nombreProducto || "",
         descripcion: pedido.descripcion || "",
         cantidad: pedido.cantidad || 0,
         precioUnitario: pedido.precioUnitario || 0,
         precioVenta: pedido.precioVenta || 0,
         precioCosto: pedido.precioCosto || 0,
         
         // Array de productos si hay múltiples
         productos: (pedido.productos || []).map(prod => ({
            nombre: prod.nombreProducto || prod.nombre || "",
            descripcion: prod.descripcion || "",
            cantidad: prod.cantidad || 0,
            precioUnitario: prod.precioUnitario || prod.precioVenta || 0,
            precioVenta: prod.precioVenta || 0,
            precioCosto: prod.precioCosto || 0,
            subtotal: prod.subtotal || (prod.cantidad && prod.precioUnitario ? prod.cantidad * prod.precioUnitario : 0)
         }))
      };
      setSelectedPedido(pedidoDetalle);
      setOpenModal(true);
      console.log('Pedido seleccionado:', pedidoDetalle);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedPedido(null);
   };

   // Filtrar pedidos basado en el término de búsqueda
   const pedidosFiltrados = resultadoPedidos.filter(pedido => 
      pedido.nombreCliente?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      pedido.idVentas?.toString().includes(terminoBusqueda) ||
      pedido.estadoVentas?.toLowerCase().includes(terminoBusqueda.toLowerCase())
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
                     <button className="btn btn-primary btn-sm">Nuevo Pedido</button>
                  </div>
               </div>
               <div className="card-body">
                  {pedidosFiltrados.length === 0 ? (
                     <div className="text-center text-muted py-4">
                        No se encontraron pedidos.
                     </div>
                  ) : (
                     <div className="table-responsive">
                        <table className="table table-hover">
                           <thead>
                              <tr>
                                 <th>Cliente</th>
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
                              {pedidosFiltrados.map((pedido) => (
                                 <tr key={pedido.idVentas}>
                                    <td>
                                       <code>{pedido.idCliente}</code> {pedido.nombreCliente}
                                    </td>
                                    <td>#{pedido.idVentas}</td>
                                    <td>{new Date(pedido.fechaVenta).toLocaleDateString()}</td>
                                    <td>
                                       <span className={`badge bg-${getStatusBadge(pedido.estadoVentas)}`}>
                                          {pedido.estadoVentas}
                                       </span>
                                    </td>
                                    <td className="fw-bold">${pedido.subtotal}</td>
                                    <td>
                                       <div>
                                          <strong>{pedido.nombreCliente}</strong><br />
                                          <small className="text-muted">
                                             {pedido.emailCliente}, {pedido.telefonoCliente}
                                          </small>
                                       </div>
                                    </td>
                                    <td>
                                       <div>
                                          <small className="text-muted">
                                             {pedido.tipoEntrega || "Retiro"}
                                          </small>
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
                  )}
               </div>
            </div>
         </div>

         {/* Modal para ver detalles del pedido */}
         {openModal && selectedPedido && (
            <>
               <div className={`modal fade ${openModal ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="pedidoModalLabel" aria-hidden={!openModal}>
                  <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title text-dark" id="pedidoModalLabel">
                              Detalles del Pedido #{selectedPedido.idVentas}
                           </h5>
                           <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-dark">
                           {/* Detalles del comprador */}
                           <h6 className="mb-2 border-bottom pb-1">Detalles del comprador</h6>
                           <div className="mb-3">
                              <strong>Nombre:</strong> {selectedPedido.nombreCliente} {selectedPedido.apellidoCliente}<br />
                              <strong>Email:</strong> {selectedPedido.emailCliente}<br />
                              <strong>Teléfono:</strong> {selectedPedido.telefonoCliente}<br />
                              <strong>Dirección:</strong> {selectedPedido.domicilioCliente}
                           </div>

                           {/* Detalles de la venta */}
                           <h6 className="mb-2 border-bottom pb-1">Detalles de la venta</h6>
                           <div className="mb-3">
                              <strong>ID Venta:</strong> {selectedPedido.idVentas}<br />
                              <strong>Fecha:</strong> {selectedPedido.fechaVenta ? new Date(selectedPedido.fechaVenta).toLocaleDateString() : ''}<br />
                              <strong>Empleado:</strong> {selectedPedido.nombreEmpleado} {selectedPedido.apellidoEmpleado}<br />
                              <strong>Estado:</strong> <span className={`badge bg-${getStatusBadge(selectedPedido.estadoVentas)}`}>{selectedPedido.estadoVentas}</span><br />
                              <strong>Total Venta:</strong> ${selectedPedido.totalVenta}
                           </div>

                           {/* Detalles de productos */}
                           <h6 className="mb-2 border-bottom pb-1">Detalles de productos</h6>
                           <div>
                              <table className="table table-sm">
                                 <thead>
                                    <tr>
                                       <th>Producto</th>
                                       <th>Descripción</th>
                                       <th>Cantidad</th>
                                       <th>Precio Unitario</th>
                                       <th>Precio Venta</th>
                                       <th>Precio Costo</th>
                                       <th>Subtotal</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {selectedPedido.productos && selectedPedido.productos.length > 0 ? (
                                       // Si hay múltiples productos
                                       selectedPedido.productos.map((producto, index) => (
                                          <tr key={index}>
                                             <td>{producto.nombre}</td>
                                             <td>{producto.descripcion}</td>
                                             <td>{producto.cantidad}</td>
                                             <td>${producto.precioUnitario}</td>
                                             <td>${producto.precioVenta}</td>
                                             <td>${producto.precioCosto}</td>
                                             <td>${producto.subtotal}</td>
                                          </tr>
                                       ))
                                    ) : (
                                       // Si es un producto único
                                       <tr>
                                          <td>{selectedPedido.nombreProducto}</td>
                                          <td>{selectedPedido.descripcion}</td>
                                          <td>{selectedPedido.cantidad}</td>
                                          <td>${selectedPedido.precioUnitario}</td>
                                          <td>${selectedPedido.precioVenta}</td>
                                          <td>${selectedPedido.precioCosto}</td>
                                          <td>${selectedPedido.cantidad * selectedPedido.precioUnitario}</td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                           <button type="button" className="btn btn-primary">Imprimir</button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="modal-backdrop fade show"></div>
            </>
         )}
      </div>
   );
};

export default Pedidos;