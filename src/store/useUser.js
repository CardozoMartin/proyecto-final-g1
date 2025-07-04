import { create } from 'zustand'; // Importamos zustand

export const useUser = create((set, get) => ({
  
  usuario: null, 
  estaLogueado: false, 
  
  // Función para cargar usuario cuando se inicia la app
  inicializar: () => {
    // Buscamos en localStorage
    const usuarioGuardado = localStorage.getItem('usuario'); 
    if (usuarioGuardado) {
        // Convertimos de string a objeto
      const datosUsuario = JSON.parse(usuarioGuardado);
       // Actualizamos el estado
      set({ usuario: datosUsuario, estaLogueado: true }); 
    }
  },
  
  // Función para hacer login
  login: (datosUsuario) => {
    // Guardamos en el estado
    set({ usuario: datosUsuario, estaLogueado: true }); 
    // Guardamos en localStorage
    localStorage.setItem('usuario', JSON.stringify(datosUsuario)); 
  },
  
  // Función para hacer logout
  logout: () => {
    // Limpiamos el estado
    set({ usuario: null, estaLogueado: false }); 
    // Borramos de localStorage
    localStorage.removeItem('usuario'); 
  },
  
  // Función para obtener el usuario actual
  obtenerUsuario: () => {
    // Devolvemos el usuario
    return get().usuario; 
  },
  
  // Función para saber si está logueado
  Logueado: () => {
    // Devolvemos si está logueado
    return get().estaLogueado; 
  }
  
}));