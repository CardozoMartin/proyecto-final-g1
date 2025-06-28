import { create } from 'zustand';

export const useCartStore = create((set) => ({
  productosCarrito: [],
  
  agregarProductoAlCarrito: (producto) =>
    set((state) => {
      const productoExistente = state.productosCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        // Si existe, aumentar la cantidad y recalcular el total
        //se puede agregar un toaste para indicar que el producto esta agregado 
        
        return {
          productosCarrito: state.productosCarrito.map(item =>
            item.id === producto.id
              ? { 
                  ...item, 
                  cantidad: item.cantidad + 1, 
                  total: item.precioVenta * (item.cantidad + 1) 
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

  restarCantidadProducto: (id) =>
    set((state) => ({
      productosCarrito: state.productosCarrito
        .map(item =>
          item.id === id && item.cantidad > 1
            ? { 
                ...item, 
                cantidad: item.cantidad - 1, 
                total: item.precioVenta * (item.cantidad - 1) // Recalcular total
              }
            : item
        )
        .filter(item => item.cantidad > 0),
    })),

  eliminarProductoDelCarrito: (id) =>
    set((state) => ({
      productosCarrito: state.productosCarrito.filter(item => item.id !== id),
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