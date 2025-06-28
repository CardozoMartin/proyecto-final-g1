import axios from 'axios';
import React, { useState } from 'react';
import { useUser } from '../../store/useUser';


const API_URL = import.meta.env.VITE_API_URL;

const useCustomLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Obtener la función login del store de Zustand
    const { login: loginToStore } = useUser();

    const login = async (emailCliente, contraseña) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${API_URL}/api/login/`, {
                emailCliente, 
                contraseña
            });
                         
            const resultado = response.data;
            
            // Usar la función login del store de Zustand
            loginToStore(resultado);
            
            return resultado;
        } catch (error) {
            console.error("Error en el login:", error);
            setError(error.response?.data?.message || 'Error en el login');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { 
        login, 
        loading, 
        error 
    };
};

export default useCustomLogin;