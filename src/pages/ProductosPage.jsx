import React , {useEffect, useState} from 'react'

import useCustomProductos from '../CustomHooks/useCustomProductos';
import { useCartStore } from '../store/useCartStore';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Toaster } from 'sonner';
import { useUser } from '../store/useUser';

const ProductosPage = () => {

    const { productosCarrito,agregarProductoAlCarrito} = useCartStore();
    const {productos} = useCustomProductos();
    const resultadoProductos = productos.productos || [];
    const { user} = useUser();

    // Estado para la búsqueda 
    const [busqueda, setBusqueda] = useState("");   
    // handler de búsqueda
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };
    // Filtrar productos por nombre
    const productosFiltrados = resultadoProductos.filter(producto => 
        producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
    );

     //creamos una funcion para menejar como agregamos el producto al carritoAdd commentMore actions
    const handleAgregarAlCarrito = (producto)=>{
        //creamos un modelo del producto que se va agregar al carrito
        const productoQueSeAgrega = {
            id: producto.idProductos,
            nombreProducto: producto.nombreProducto,
            descripcion: producto.descripcion,
            precioVenta: producto.precioVenta,
            imagenProducto: producto.imagenProducto,
            cantidad: 1, 
        }
        
        //funcion pora agregar el producto al carrito
        toast.success(`Producto ${productoQueSeAgrega.nombreProducto} agregado al carrito`)
        agregarProductoAlCarrito(productoQueSeAgrega);
        //mostramos un toaste de exito para indicar que el producto se ha agregado al carrito
    }

    useEffect(() => {
        console.log('Productos en el carrito:', productosCarrito);
    }, [productosCarrito]);

    return (

        <div className="container-fluid py-4">
            <Toaster position="top-right" richColors />
            <div className="row">
               

                {/* Área de Productos */}
                <div className="col-lg-9 col-md-8 mx-auto">
                    {/* Header de productos */}
                    {/* Barra de búsqueda */}
                    <div className='mb-4'>
                        <input 
                        type="text" 
                        className='form-control' 
                        placeholder='Buscar' 
                        value={busqueda} 
                        onChange={handleBusqueda} />
                    </div>

                    {/* Grid de Productos - Centrado */}
                    <div className="d-flex justify-content-center">
                        <div className="row g-4" style={{ maxWidth: '1200px' }}>
                            {productosFiltrados.map((producto, index) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center" key={index}>
                                    <div className="card h-100 shadow-sm" style={{ width: "280px" }}>
                                        <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                                            <img
                                                src={producto.imagenProducto || "error al cargar imagen"}
                                                className="card-img-top w-100 h-100"
                                                alt={producto.nombreProducto}
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }}
                                            />
                                        </div>

                                        <div className="card-body d-flex flex-column">
                                            <div className="mb-3">
                                                <h5 className="card-title fw-bold mb-2">
                                                    {producto.nombreProducto}
                                                </h5>
                                                <p className="card-text text-muted small mb-0">
                                                    {producto.descripcion}
                                                </p>
                                            </div>

                                            <div className="mt-auto">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <span className="h5 text-primary fw-bold mb-0">
                                                            ${producto.precioVenta}
                                                        </span>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm" onClick={() => handleAgregarAlCarrito(producto)}>
                                                        <i className="fas fa-cart-plus me-1"></i>
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>))
                            }
                            {productosFiltrados.length === 0 && (
                                <div className="col-12">
                                    <div className="alert alert-warning text-center" role="alert">
                                        No se encontraron productos que coincidan con la búsqueda.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    )
}

export default ProductosPage