import React, { useState } from 'react'
import '../../css/cart.css'
import { useCartStore } from '../../store/useCartStore';
import { useUser } from '../../store/useUser';
import useCustomCart from '../../CustomHooks/CustomCart/useCustomCart';
import { toast } from 'sonner';
import ModalFinalizarCompra from './ModalFinalizarCompra';
const CartComponente = () => {
    const { productosCarrito, agregarProductoAlCarrito, restarCantidadProducto, eliminarProductoDelCarrito } = useCartStore();
    const { user } = useUser()
    const { vaciarCarrito } = useCartStore()
    const [openModal, setOpenModal] = useState(false)
    console.log("Productos en el carrito:", productosCarrito);

    
    

  
    const terminarLaCompra = () => {

        //abriamos un modal para ver todos los detalles de la compra
        if (productosCarrito.length === 0) {
            toast.error('No hay productos en el carrito para finalizar la compra.');
            return;
        }
        setOpenModal(true);

    }
    return (
        <div>
            <div className=' fixed-bottom p-3 text-end'>

                <button className="btn-primary btn-cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    <i className="bi bi-cart-plus-fill icon-btn"></i>
                </button>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Carrito</h5>
                    <button type="button" className="btn-close text-dark" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        {productosCarrito.length === 0 ? (
                            <div className="text-center">No hay productos en el carrito.</div>
                        ) : (
                            <ul className="list-group">
                                {productosCarrito.map((producto, index) => (
                                    <li className="list-group-item py-3 px-2" key={index}>
                                        <div className="d-flex align-items-center justify-content-between gap-3">
                                            <div className="d-flex align-items-center gap-3 flex-grow-1">
                                                <img
                                                    src={producto.imagenProducto}
                                                    alt={producto.nombreProducto}
                                                    className="rounded border"
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', background: '#f8f9fa' }}
                                                />
                                                <div className="flex-grow-1">
                                                    <div className="fw-semibold mb-1">{producto.nombreProducto}</div>
                                                    <div className="text-muted small mb-2">{producto.descripcion}</div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <button className="btn btn-secondary btn-sm px-2" onClick={() => restarCantidadProducto(producto.idProductos)}>-</button>
                                                        <span className="mx-1 px-2 border rounded bg-light">{producto.cantidad}</span>
                                                        <button className="btn btn-primary btn-sm px-2" onClick={() => agregarProductoAlCarrito(producto)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column align-items-end ms-3">
                                                <span className="badge bg-primary mb-2 fs-6">${producto.total}</span>
                                                <button className="btn btn-danger btn-sm" style={{ minWidth: '80px' }} onClick={() => eliminarProductoDelCarrito(producto.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {
                    user ? (
                        <button className='btn btn-success' onClick={terminarLaCompra}>Finalizar Compra</button>
                    ) : (
                        <div className="alert alert-warning mt-3" role="alert">Por favor, inicia sesión para continuar con la compra.</div>
                    )
                }
            </div>
            {/* Modal para ver los detalles de la compra */}
          <ModalFinalizarCompra openModal={openModal} setOpenModal={setOpenModal}></ModalFinalizarCompra>
        </div>
    )
}

export default CartComponente