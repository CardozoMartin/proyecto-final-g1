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
  const editarProveedor = async () => {};
  const eliminarProveedor = async () => {};
  const agregarProveedor = async () => {};

  useEffect(() => {
    obtenerProveedor()}, []);

  return {
    proveedor,
    obtenerProveedor,
    editarProveedor,
    eliminarProveedor,
    agregarProveedor
  };
};

export default useCustomProveedores;
