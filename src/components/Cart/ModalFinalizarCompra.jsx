import React from 'react'
import { useUser } from '../../store/useUser'
import useCustomCart from '../../CustomHooks/CustomCart/useCustomCart';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useCartStore } from '../../store/useCartStore';

const ModalFinalizarCompra = ({ openModal, setOpenModal}) => {
    const { usuario } = useUser();
    const { productosCarrito, limpiar } = useCartStore();
    console.log(productosCarrito);

// Calculamos el total de la compra correctamente usando reduce
const totalCompra = productosCarrito.reduce(
  (total, producto) => total + (producto.precioVenta * producto.cantidad),
  0
);
const { postCarrito } = useCustomCart()
    //funcion para finalizar la compra
      const carrito = {
            idEmpleados: 24,
            idClientes: usuario?.cliente.idClientes,
            productos: productosCarrito.map(producto => ({
                idProducto: producto.id,
                cantidad: producto.cantidad,
                precioUnitario: Number(producto.precioVenta)
            })),
        }
    const handleFinalizarCompra = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro de finalizar la compra?',
            text: `Total a pagar: $${totalCompra}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, finalizar compra',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const respuesta = await postCarrito(carrito);
            if (respuesta?.success) {
                limpiar();
                toast.success('Compra finalizada con éxito');
                setOpenModal(false);
            } else {
                toast.error('Ocurrió un error al finalizar la compra');
            }
        }
    }
    return (
        <div>  <div className={`modal fade ${openModal ? 'show' : ''}`} style={{ display: openModal ? 'block' : 'none' }} id="modalCompra" tabIndex="-1" aria-labelledby="modalCompraLabel" aria-hidden={!openModal}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-dark" id="modalCompraLabel">Detalles de la Compra</h5>
                         <button
                        type="button"
                        className="btn btn-danger text-dark ms-auto"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={() => setOpenModal(false)}
                    ><i className="bi bi-x-lg"></i></button>
                    </div>
                    <div className="modal-body text-dark">
                        {/* Aquí puedes mostrar los detalles de la compra */}
                        <h3 className='text-dark'>Productos</h3>
                        <ul className="list-group list-style">
                            {productosCarrito.map((producto, index) => (
                                <li key={index} className="list-group-item">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={producto.imagenProducto || 'error al cargar imagen'}
                                                alt={producto.nombreProducto}
                                                className="img-fluid me-2"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                            <span className="fw-semibold">
                                                {producto.nombreProducto} - Cantidad: {producto.cantidad}
                                            </span>
                                        </div>
                                        <span className="fw-bold text-end">
                                            Precio: ${producto.precioVenta}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                         <ul className="list-group list-style d-flex flex-row justify-content-end mt-3">
                                <li className="list-group-item">
                                    <p className='lead'>Total</p> <span className='fw-bold'> $ {totalCompra}</span>
                                </li>
                         
                        </ul>
                        <div className='mt-4 text-dark'>
                            <h5>Datos Personales</h5>
                            <div className="card p-3 mb-2 shadow-sm">
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <strong>Nombre:</strong> {usuario?.cliente?.nombreCliente || "-"}
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <strong>Apellido:</strong> {usuario?.cliente?.apellidoCliente || "-"}
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <strong>Email:</strong> {usuario?.cliente?.emailCliente || "-"}
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <strong>Teléfono:</strong> {usuario?.cliente?.telefonoCliente || "-"}
                                    </div>
                                    <div className="col-12 mb-2">
                                        <strong>Dirección:</strong> {usuario?.cliente?.direccionCliente || usuario?.cliente?.domicilioCliente || "-"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setOpenModal(false)}>Cerrar</button>
                        <button type="button" className="btn btn-success" onClick={handleFinalizarCompra}>Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default ModalFinalizarCompra