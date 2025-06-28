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
        `http://localhost:3000/api/empleados/ObtenerEmpleados`
      );
      // Guarda solo el array
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
        `http://localhost:3000/api/empleados/CrearEmpleados`,
        nuevoEmpleado
      );
      await obtenerTodosEmpleados();
    } catch (error) {
      setError(error.message);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un empleado
  const eliminarEmpleado = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(
        `http://localhost:3000/api/empleados/EliminarEmpleados/${id}`
      );
      // Refresca la lista después de eliminar
      await obtenerTodosEmpleados();
    } catch (error) {
      console.error("Error al eliminar el Empleado:", error);
      setError(error.message);
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
        `http://localhost:3000/api/empleados/actualizarEmpleados/${id}`,
        empleadoActualizado
      );
      await obtenerTodosEmpleados();
    } catch (error) {
      setError(error.message);
      throw error; 
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
    eliminarEmpleado,
    editarEmpleado,
    
  };
};

export default useCustomEmpleados;
