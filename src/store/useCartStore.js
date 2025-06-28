import { create } from 'zustand';

export const useCartStore = create((set) => ({
  productosCarrito: [],
  
  agregarProductoAlCarrito: (producto) =>
    set((state) => {
      const productoExistente = state.productosCarrito.find(item => item.idProductos === producto.idProductos);
      
      if (productoExistente) {
        // Si existe, aumentar la cantidad y recalcular el total
        //se puede agregar un toaste para indicar que el producto esta agregado 
        
        return {
          productosCarrito: state.productosCarrito.map(item =>
            item.idProductos === producto.idProductos
              ? { 
                  ...item, 
                  cantidad: item.cantidad + 1, 
                  total: item.precioVenta * (item.cantidad + 1) // Recalcular total basado en cantidad
                }
              : item
          ),
        };
      }
      
      // Si no existe, agregarlo con cantidad 1 y total igual al precio
      return {
        productosCarrito: [...state.productosCarrito, { 
          ...producto, 
          cantidad: 1, 
          total: producto.precioVenta 
        }],
      };
    }),

  restarCantidadProducto: (idProductos) =>
    set((state) => ({
      productosCarrito: state.productosCarrito
        .map(item =>
          item.idProductos === idProductos && item.cantidad > 1
            ? { 
                ...item, 
                cantidad: item.cantidad - 1, 
                total: item.precioVenta * (item.cantidad - 1) // Recalcular total
              }
            : item
        )
        .filter(item => item.cantidad > 0),
    })),

  eliminarProductoDelCarrito: (idProductos) =>
    set((state) => ({
      productosCarrito: state.productosCarrito.filter(item => item.idProductos !== idProductos),
    })),

  // Función para obtener el total del carrito
  obtenerTotalCarrito: () => {
    const state = useCartStore.getState();
    return state.productosCarrito.reduce((total, item) => total + item.total, 0);
  },

  // Función para obtener la cantidad total de productos
  obtenerCantidadTotal: () => {
    const state = useCartStore.getState();
    return state.productosCarrito.reduce((total, item) => total + item.cantidad, 0);
  },

  // Función para vaciar el carrito
  vaciarCarrito: () =>
    set(() => ({
      productosCarrito: [],
    })),
}));