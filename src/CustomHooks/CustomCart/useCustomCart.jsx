import React, { useState } from 'react'

const useCustomCart = () => {
 
    const [ productosCarrito, setProductosCarrito ] = useState([]);

    
    const agregarProductoAlCarrito = (producto) => {
        setProductosCarrito(prev => [...prev, producto]);
        console.log(`Producto agregado al carrito: ${producto.nombreProducto}`);
    }

    return {
        productosCarrito,
        agregarProductoAlCarrito
    }
}

export default useCustomCart