import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useCustomProveedores = () => {
  const [proveedor, setProveedor] = useState([]); // array de proveedores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerProveedor = async () => {
    try {
      const response = await axios.get(`${API_URL}/proveedores/obtenerProveedor`);
      setProveedor(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      setError(error);
      setLoading(false);
    }
  };

  const eliminarProveedor = async (idProv) => {
    try {
      const response = await axios.delete(`${API_URL}/proveedores/eliminarProveedor/${idProv}`);
      if (response.data) {
        setProveedor((prev) => prev.filter((prod) => prod.idProveedores !== idProv));
        return { success: true, data: response.data };
      } else {
        return { success: false, error: "No se recibió respuesta del servidor" };
      }
    } catch (error) {
      console.error("Error al eliminar Proveedor:", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const insertarProveedor = async (nuevoProveedor) => {
    try {
      const respuesta = await axios.post(`${API_URL}/proveedores/insertarProveedor`, nuevoProveedor);
      if (respuesta.data) {
        setProveedor((prev) => [...prev, respuesta.data]);
        return { success: true, data: respuesta.data };
      } else {
        return { success: false, error: "No se recibió respuesta del servidor" };
      }
    } catch (error) {
      console.error("Error al agregar Proveedor:", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const actualizarProveedor = async (idProveedores, proveedorActualizado) => {
    try {
      const response = await axios.put(`${API_URL}/proveedores/actualizarProveedor/${idProveedores}`, {
        nombreProveedores: proveedorActualizado.nombreProveedores,
        TelefonoProveedores: proveedorActualizado.TelefonoProveedores,
        EmailProveedores: proveedorActualizado.EmailProveedores,
        DomicilioProveedores: proveedorActualizado.DomicilioProveedores,
      });

      const proveedorActualizadoData = response.data; // Ajusta si la respuesta tiene otra estructura
      setProveedor((prev) =>
        prev.map((prov) =>
          prov.idProveedores === idProveedores ? proveedorActualizadoData : prov
        )
      );

      return { success: true, data: proveedorActualizadoData };
    } catch (error) {
      console.error("Error al editar proveedor:", error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  useEffect(() => {
    obtenerProveedor();
  }, []);

  return {
    proveedor,
    obtenerProveedor,
    eliminarProveedor,
    insertarProveedor,
    actualizarProveedor,
    loading,
    error,
  };
};

export default useCustomProveedores;
