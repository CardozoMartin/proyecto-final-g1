import axios from "axios";
import React, { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useCustomEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombreEmpleado, setNombreEmpleado] = useState("");

  // Obtener todos los empleados
  const obtenerTodosEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:3000/api/empleados/ObtenerEmpleados`
      );
      console.log(response);
      setEmpleados(response.data);
      console.log(empleados);
    } catch (error) {
      console.error("Error al obtener los Empleados:", error);
      setError(error.message);
      setEmpleados({ empleados: [] });
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
      const response = await axios.post(
        `http://localhost:3000/api/empleados/CrearEmpleados`,
        nuevoEmpleado
      );
      console.log(response);
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al crear el Empleado:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un empleado
  const eliminarEmpleado = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(
        `http://localhost:3000/api/empleados/EliminarEmpleados/${id}`
      );
      console.log(response);
      setEmpleados(empleados.filter((empleado) => empleado.idEmpleados !== id));
    } catch (error) {
      console.error("Error al eliminar el Empleado:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // editar empleado
  const editarEmpleado = async (id, empleadoActualizado) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `http://localhost:3000/api/empleados/actualizarEmpleados/${id}`,
        empleadoActualizado
      );
      console.log(response);
      setEmpleados(
        empleados.map((empleado) =>
          empleado.idEmpleados === id ? response.data : empleado
        )
      );
    } catch (error) {
      console.error("Error al editar el Empleado:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Buscar empleados por nombre
  const buscarEmpleadosNombre = async (nombre) => {
    if (!nombre.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const nombreUrl = encodeURIComponent(nombre);
      const response = await axios.get(
        `http://localhost:3000/api/empleados/ObtenerEmpleados/nombre/${nombreUrl}`
      );
      console.log(response.data);
      setNombreEmpleado(response.data);
    } catch (error) {
      console.error("Error al buscar empleados:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
    
  };


    





  return {
    empleados,
    loading,
    error,
    nombreEmpleado,
    obtenerTodosEmpleados,
    crearEmpleado,
    eliminarEmpleado,
    editarEmpleado,
    buscarEmpleadosNombre,
   
  };
};

export default useCustomEmpleados;
