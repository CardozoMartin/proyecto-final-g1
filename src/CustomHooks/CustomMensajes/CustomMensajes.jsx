import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useCustomMensajes = () => {
  const [mensajes, setMensajes] = useState([]); // plural para mejor semántica
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerMensajes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/mensajes/vermensaje`);
      setMensajes(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error al obtener Mensajes:", error);
      setError(error);
      setLoading(false);
      return null;
    }
  };

  const enviarMensaje = async (nuevoMensaje) => {
    try {
      const respuesta = await axios.post(
        `${API_URL}/api/mensajes/enviarmensaje`,
        nuevoMensaje
      );
      if (respuesta.data) {
        setMensajes((prev) => [...prev, respuesta.data]);
        return { success: true, data: respuesta.data };
      } else {
        return {
          success: false,
          error: "No se recibió respuesta del servidor",
        };
      }
    } catch (error) {
      console.error("Error al enviarMensaje:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const marcarComoVisto = async (idMensaje) => {
    try {
      await axios.put(`${API_URL}/api/mensajes/visto/${idMensaje}`);
      setMensajes((prev) =>
        prev.map((m) =>
          m.idMensaje === idMensaje ? { ...m, estadoMensaje: "VISTO" } : m
        )
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error al actualizar estado",
      };
    }
  };

  return {
    mensajes,
    obtenerMensajes,
    enviarMensaje,
    loading,
    error,
    marcarComoVisto,
  };
};

export default useCustomMensajes;
