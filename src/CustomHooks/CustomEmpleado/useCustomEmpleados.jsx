import axios from "axios";
import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useCustomEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todos los empleados
  const obtenerTodosEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_URL}/api/empleados/ObtenerEmpleados`
      );
      setEmpleados(response.data.empleados || []);
    } catch (error) {
      console.error("Error al obtener los Empleados:", error);
      setError(error.message);
      setEmpleados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerTodosEmpleados();
  }, []);

  // Agregar un nuevo empleado
  const crearEmpleado = async (nuevoEmpleado) => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(
        `${API_URL}/api/empleados/CrearEmpleados`,
        nuevoEmpleado
      );
      await obtenerTodosEmpleados();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setLoading(false);
    }
  };

  // Editar empleado
  const editarEmpleado = async (id, empleadoActualizado) => {
    try {
      setLoading(true);
      setError(null);
      await axios.put(
        `${API_URL}/api/empleados/actualizarEmpleados/${id}`,
        empleadoActualizado
      );
      await obtenerTodosEmpleados();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    empleados,
    loading,
    error,
    obtenerTodosEmpleados,
    crearEmpleado,
    editarEmpleado,
  };
};

export default useCustomEmpleados;