import React, { useState, useEffect } from 'react';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias.jsx';
import { toast } from 'sonner';

// Recibe la prop categoria para edición
const FormCategorias = ({ categoria }) => {
  const { agregarCategoria, editarCategoria, obtenerCategorias } = useCustomCategorias();

  // Estado para el formulario, inicializa vacío
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombreCategoriaProductos: ''
  });

  // Si recibimos una categoría para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (categoria) {
      setNuevaCategoria({
        nombreCategoriaProductos: categoria.nombreCategoriaProductos || ''
      });
    } else {
      // Si no hay categoría (modo agregar), limpiamos el formulario
      setNuevaCategoria({
        nombreCategoriaProductos: ''
      });
    }
  }, [categoria]);

  //-----------------------Handlers---------------------
  // Maneja los cambios en los campos del formulario
  const handleAgregarCategoria = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si hay categoría, estamos en modo edición
    if (categoria) {
      // Esperamos a que termine la edición antes de refrescar la lista
      const resultado = await editarCategoria(categoria.idCat_productos, nuevaCategoria);
      if (resultado.success) {
        toast.success('Categoría editada correctamente');
        setNuevaCategoria({
          nombreCategoriaProductos: ''
        });
        // Solo refrescamos la lista si la edición fue exitosa
        await obtenerCategorias();
      } else {
        toast.error(`Error al editar categoría: ${resultado.error}`);
      }
    } else {
      // Agregar categoría nueva
      const resultado = await agregarCategoria(nuevaCategoria);
      if (resultado.success) {
        setNuevaCategoria({
          nombreCategoriaProductos: ''
        });
        toast.success('Categoría agregada correctamente');
        await obtenerCategorias();
      } else {
        toast.error(`Error al agregar categoría: ${resultado.error}`);
      }
    }
  };

  //------------------------Render---------------------
  return (
    <div>
      {/* Formulario para agregar o editar categoría */}
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre de la categoría */}
        <div className="mb-3">
          <label htmlFor="nombreCategoriaProductos" className="form-label">Nombre de la Categoría</label>
          <input
            id="nombreCategoriaProductos"
            name="nombreCategoriaProductos"
            value={nuevaCategoria.nombreCategoriaProductos}
            onChange={handleAgregarCategoria}
            placeholder="Ingrese el nombre de la categoría"
            className="form-control"
            required
          />
        </div>
        {/* Botón de acción, cambia el texto según si es edición o alta */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            {categoria ? 'Guardar Cambios' : 'Agregar Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCategorias;