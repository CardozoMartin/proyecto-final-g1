import { create } from 'zustand'; // Importamos zustand

export const useUser = create((set, get) => ({
  
  usuario: null, // Guardamos los datos del usuario
  estaLogueado: false, // Si está logueado o no
  
  // Función para cargar usuario cuando se inicia la app
  inicializar: () => {
    const usuarioGuardado = localStorage.getItem('usuario'); // Buscamos en localStorage
    if (usuarioGuardado) {
      const datosUsuario = JSON.parse(usuarioGuardado); // Convertimos de string a objeto
      set({ usuario: datosUsuario, estaLogueado: true }); // Actualizamos el estado
    }
  },
  
  // Función para hacer login
  login: (datosUsuario) => {
    set({ usuario: datosUsuario, estaLogueado: true }); // Guardamos en el estado
    localStorage.setItem('usuario', JSON.stringify(datosUsuario)); // Guardamos en localStorage
  },
  
  // Función para hacer logout
  logout: () => {
    set({ usuario: null, estaLogueado: false }); // Limpiamos el estado
    localStorage.removeItem('usuario'); // Borramos de localStorage
  },
  
  // Función para obtener el usuario actual
  obtenerUsuario: () => {
    return get().usuario; // Devolvemos el usuario
  },
  
  // Función para saber si está logueado
  Logueado: () => {
    return get().estaLogueado; // Devolvemos si está logueado
  }
  
}));