import { create } from 'zustand';

export const useUser = create((set, get) => ({
    user: null,
    estaLogueado: false,
    
    // Función para inicializar el estado desde localStorage
    initializeAuth: () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                set({ user: userData, estaLogueado: true });
            }
        } catch (error) {
            console.error('Error al cargar usuario desde localStorage:', error);
            localStorage.removeItem('user'); // Limpiar datos corruptos
        }
    },
    
    login: (userData) => {
        // Actualizar el estado de Zustand
        set({ user: userData, estaLogueado: true });
        
        // Guardar en localStorage
        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    },
    
    logout: () => {
        // Limpiar estado de Zustand
        set({ user: null, estaLogueado: false });
        
        // Limpiar localStorage
        localStorage.removeItem('user');
    },
    
    // Función para obtener el usuario actual
    getCurrentUser: () => {
        return get().user;
    },
    
    // Función para verificar si está logueado
    isAuthenticated: () => {
        return get().estaLogueado;
    }
}));