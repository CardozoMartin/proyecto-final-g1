import axios from 'axios';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const useCustomCategorias = () => {
  const [categorias, setCategorias] = useState({ categorias: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para mostrar todas las categorías
  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/categorias/obtenerTodasLasCategorias`);
      console.log('Datos recibidos:', response.data);
      setCategorias({ categorias: response.data.categorias || [] });
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      setError(error.response?.data?.message || 'No se pudieron cargar las categorías');
      setCategorias({ categorias: [] });
    } finally {
      setLoading(false);
    }
  };

  // Para agregar una categoría
  const agregarCategoria = async (nuevaCategoria) => {
    try {
      const response = await axios.post(`${API_URL}/api/categorias/crearCategoria`, {
        nombreCategoriaProductos: nuevaCategoria.nombreCategoriaProductos,
        imagenCategoriaProductos: nuevaCategoria.imagenCategoriaProductos,
        estado: nuevaCategoria.estado
      });
      const nuevaCategoriaData = {
        idCat_productos: response.data.id,
        nombreCategoriaProductos: response.data.nombreCategoriaProductos,
        imagenCategoriaProductos: response.data.imagenCategoriaProductos,
        estado: response.data.estado
      };
      setCategorias(prev => ({
        categorias: [...(prev.categorias || []), nuevaCategoriaData]
      }));
      console.log('Categoría agregada:', nuevaCategoriaData);
      return { success: true, data: nuevaCategoriaData };
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para editar una categoría
  const editarCategoria = async (id, categoriaActualizada) => {
    try {
      const response = await axios.put(`${API_URL}/api/categorias/actualizarCategoria/${id}`, {
        nombreCategoriaProductos: categoriaActualizada.nombreCategoriaProductos,
        imagenCategoriaProductos: categoriaActualizada.imagenCategoriaProductos,
        estado: categoriaActualizada.estado
      });
      const categoriaActualizadaData = response.data.categoria;
      setCategorias(prev => ({
        categorias: prev.categorias.map(cat =>
          cat.idCat_productos === id ? categoriaActualizadaData : cat
        )
      }));
      return { success: true, data: categoriaActualizadaData };
    } catch (error) {
      console.error('Error al editar categoría:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  // Para actualizar el estado de múltiples categorías
  const actualizarEstadoCategoria = async (ids, estado) => {
    try {
      const updatePromises = ids.map((id) =>
        axios.patch(`${API_URL}/api/categorias/actualizarCategoria/${id}`, { estado })
      );
      const responses = await Promise.all(updatePromises);
      return { success: true, data: responses.map(res => res.data) };
    } catch (error) {
      console.error('Error al actualizar estados:', error);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    obtenerCategorias,
    agregarCategoria,
    editarCategoria,
    actualizarEstadoCategoria
  };
};

export default useCustomCategorias;