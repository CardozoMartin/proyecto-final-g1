import axios from 'axios';
import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL
const useCustomLogin = () => {
    const [user, setUser] = useState(null);

    const login = async (emailCliente, contraseña) => {
        try {
            const response = await axios.post(`${API_URL}/api/login/`, {
                emailCliente, contraseña
            })
            
            const resultado = response.data;

            setUserInStore(resultado);

        } catch (error) {
            console.error("Error en el login:", error);
            throw error;
        }
    }

    return { login }
}

export default useCustomLogin