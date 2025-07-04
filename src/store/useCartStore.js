import { create } from 'zustand';

// Utilidad para sincronizar con localStorage
const guardarDatosEnLocalStorage = (carrito) => {
  localStorage.setItem('productosCarrito', JSON.stringify(carrito));
};

// Cargar carrito desde localStorage al iniciar
const initialCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

export const useCartStore = create((set, get) => ({
  productosCarrito: initialCarrito,

  agregarProductoAlCarrito: (producto) => {
    const carrito = get().productosCarrito;
    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
      existe.cantidad = existe.cantidad + 1;
      existe.total = existe.cantidad * existe.precioVenta;
    } else {
      carrito.push({ ...producto, cantidad: 1, total: producto.precioVenta });
    }

    guardarDatosEnLocalStorage(carrito);
    set({ productosCarrito: [...carrito] });
  },

  restarCantidadProducto: (id) => {
    const carrito = get().productosCarrito;
    const producto = carrito.find(p => p.id === id);

    if (producto && producto.cantidad > 1) {
      producto.cantidad = producto.cantidad - 1;
      producto.total = producto.cantidad * producto.precioVenta;
      guardarDatosEnLocalStorage(carrito);
      set({ productosCarrito: [...carrito] });
    } else {
      const nuevosProductos = carrito.filter(p => p.id !== id);
      guardarDatosEnLocalStorage(nuevosProductos);
      set({ productosCarrito: nuevosProductos });
      return;
    }
  },

  eliminarProductoDelCarrito: (id) => {
    const carrito = get().productosCarrito;
    const nuevosProductos = carrito.filter(p => p.id !== id);
    guardarDatosEnLocalStorage(nuevosProductos);
    set({ productosCarrito: nuevosProductos });
  },

  total: () => {
    const carrito = get().productosCarrito;
    let suma = 0;
    for (let i = 0; i < carrito.length; i++) {
      suma = suma + (carrito[i].precioVenta * carrito[i].cantidad);
    }
    return suma;
  },

  cantidadTotal: () => {
    const carrito = get().productosCarrito;
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total = total + carrito[i].cantidad;
    }
    return total;
  },

  limpiar: () => {
    guardarDatosEnLocalStorage([]);
    set({ productosCarrito: [] });
  }
}));