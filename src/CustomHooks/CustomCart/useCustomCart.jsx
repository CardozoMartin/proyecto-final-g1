import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL
const useCustomCart = () => {
 
    const [cart, setCart] = useState([])

    const postCarrito = async(carrito)=>{
        try {
            //hacemos la peticions con axios al back que vamos a bandar el carrito
            const response = await axios.post(`${API_URL}/api/ventas/`, carrito)
            //si la respuesta es exitosa, actualizamos el estado del carrito
            if(response.data){
                setCart(cart => [...cart, response.data])
            }
            //podemos agregar un toast para indicar que el carrito se envio correctamente
            return { success: true, data: response.data }
            
        } catch (error) {
            console.error("Error al enviar el carrito:", error);
            //podemos agregar un toast para indicar que hubo un error al enviar el carrito
            return { success: false, error: error.response?.data?.message || error.message }
        }
    }

    const obtenerVentas = async ()=>{
        try {
            const response = await axios.get(`${API_URL}/api/ventas/`);
            console.log("Ventas obtenidas:", response.data);
            if (response.data) {
                setCart(response.data);

            }
        } catch (error) {
            console.error("Error al obtener las ventas:", error);
        }
    }


    useEffect(()=>{
        // Cargar las ventas al montar el componente
        obtenerVentas();
    }, [])
    return {
        cart,
        setCart,
        postCarrito,
        obtenerVentas
    }
}

export default useCustomCart
