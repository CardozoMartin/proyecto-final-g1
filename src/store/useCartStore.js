import { create } from 'zustand'; // Importamos zustand

export const useCartStore = create((set, get) => ({
  
  productosCarrito: [], // Array para guardar los productos del carrito

  agregarProductoAlCarrito: (producto) => {
    const carrito = get().productosCarrito; // Obtenemos los productos actuales
    const existe = carrito.find(p => p.id === producto.id); // Buscamos si ya existe el producto
    
    if (existe) {
      existe.cantidad = existe.cantidad + 1; // Si existe, le sumamos 1 a la cantidad
      existe.total = existe.cantidad * existe.precioVenta; // Calculamos el total del producto
    } else {
      carrito.push({ ...producto, cantidad: 1, total: producto.precioVenta }); // Si no existe, lo agregamos con cantidad 1 y total
    }
    
    set({ productosCarrito: [...carrito] }); // Actualizamos el estado
  },

  restarCantidadProducto: (id) => {
    const carrito = get().productosCarrito; // Obtenemos los productos
    const producto = carrito.find(p => p.id === id); // Buscamos el producto por ID
    
    if (producto && producto.cantidad > 1) {
      producto.cantidad = producto.cantidad - 1; // Si tiene más de 1, le restamos 1
      producto.total = producto.cantidad * producto.precioVenta; // Recalculamos el total
    } else {
      const nuevosProductos = carrito.filter(p => p.id !== id); // Si tiene 1 o menos, lo eliminamos
      set({ productosCarrito: nuevosProductos }); // Actualizamos sin ese producto
      return; // Salimos de la función
    }
    
    set({ productosCarrito: [...carrito] }); // Actualizamos el estado
  },

  eliminarProductoDelCarrito: (id) => {
    const carrito = get().productosCarrito; // Obtenemos los productos
    const nuevosProductos = carrito.filter(p => p.id !== id); // Filtramos para quitar el producto
    set({ productosCarrito: nuevosProductos }); // Actualizamos el estado
  },

  total: () => {
    const carrito = get().productosCarrito; // Obtenemos los productos
    let suma = 0; // Variable para sumar el total
    for (let i = 0; i < carrito.length; i++) { // Recorremos todos los productos
      suma = suma + (carrito[i].precioVenta * carrito[i].cantidad); // Sumamos precio por cantidad
    }
    return suma; // Devolvemos el total
  },

  cantidadTotal: () => {
    const carrito = get().productosCarrito; // Obtenemos los productos
    let total = 0; // Variable para contar
    for (let i = 0; i < carrito.length; i++) { // Recorremos todos los productos
      total = total + carrito[i].cantidad; // Sumamos las cantidades
    }
    return total; // Devolvemos el total de productos
  },

  limpiar: () => {
    set({ productos: [] }); // Ponemos el array vacío para limpiar todo
  }

}));