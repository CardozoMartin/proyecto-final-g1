import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useCustomProveedores = () => {
 const [proveedor, setProveedor] = useState([]);
 const [ loading, setLoading ] = useState(true);
   const [ error, setError ] = useState(null);

  const obtenerProveedor = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/proveedores/obtenerProveedor
      `);
      console.log(response.data);
      setProveedor(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      setError(error);
      setLoading(false);
    }
  };
  const eliminarProveedor = async (idProv) => {
  try {
    const response = await axios.delete(`${API_URL}/proveedores/eliminarProveedor/${idProv}`);
    if (response.data) {
      setProveedor(prev => prev.filter(prod => prod.idProveedores !== idProv));
      console.log("Proveedor eliminado:", response.data);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "No se recibió respuesta del servidor" };
    }
  } catch (error) {
    console.error("Error al eliminar Proveedor:", error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

const insertarProveedor = async (nuevoProveedor)=>{
    try {
        const respuesta = await axios.post(`${API_URL}/provEedores/insertarProveedor`, nuevoProveedor);
        if (respuesta.data) {
            // Actualizamos la lista de clientes agregando el nuevo al array dentro del objeto
            setProveedor(prev => ({
                    ...prev,
                    proveedor: [...(prev.proveedor || []), respuesta.data]}));
           
            console.log("Proveedor agregado:", respuesta.data);
            return { success: true, data: respuesta.data };
        } else {
            return { success: false, error: "No se recibió respuesta del servidor" };
        }
    } catch (error) {
        console.error("Error al agregar Proveedor:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
};


  useEffect(() => {
    obtenerProveedor()}, []);

  return {
    proveedor,
    obtenerProveedor,
    eliminarProveedor,
    insertarProveedor
  };
};

export default useCustomProveedores;
