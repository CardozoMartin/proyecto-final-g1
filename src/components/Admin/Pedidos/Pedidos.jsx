import React from 'react'

const Pedidos = () => {
   const recentOrders = [
        { id: '#001', customer: 'Juan Pérez', product: 'Laptop Gaming', amount: '$1,299', status: 'Completado' },
        { id: '#002', customer: 'María García', product: 'Smartphone', amount: '$699', status: 'Pendiente' },
        { id: '#003', customer: 'Carlos López', product: 'Tablet', amount: '$399', status: 'Procesando' },
        { id: '#004', customer: 'Ana Martínez', product: 'Auriculares', amount: '$199', status: 'Completado' },
        { id: '#005', customer: 'Luis Rodríguez', product: 'Monitor', amount: '$299', status: 'Enviado' }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            'Completado': 'success',
            'Pendiente': 'warning',
            'Procesando': 'info',
            'Enviado': 'primary'
        };
        return badges[status] || 'secondary';
    };
    return (
        <div className="row">
            <div className="col-12">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">Pedidos Recientes</h5>
                        <button className="btn btn-primary btn-sm">Nuevo Pedido</button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Producto</th>
                                        <th>Monto</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <code>{order.id}</code>
                                            </td>
                                            <td>{order.customer}</td>
                                            <td>{order.product}</td>
                                            <td className="fw-bold">{order.amount}</td>
                                            <td>
                                                <span className={`badge bg-${getStatusBadge(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button className="btn btn-outline-primary btn-sm">Ver</button>
                                                    <button className="btn btn-outline-secondary btn-sm">Editar</button>
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
        </div>
    )
}

export default Pedidos