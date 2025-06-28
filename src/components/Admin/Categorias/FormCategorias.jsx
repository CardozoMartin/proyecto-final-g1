import React, { useState, useEffect } from 'react';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias.jsx';
import { toast } from 'sonner';

const FormCategorias = ({ categoria }) => {
  const { agregarCategoria, editarCategoria, obtenerCategorias } = useCustomCategorias();
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombreCategoriaProductos: ''
  });

  useEffect(() => {
    if (categoria) {
      setNuevaCategoria({
        nombreCategoriaProductos: categoria.nombreCategoriaProductos || ''
      });
    } else {
      setNuevaCategoria({
        nombreCategoriaProductos: ''
      });
    }
  }, [categoria]);

  const handleAgregarCategoria = (e) => {
    setNuevaCategoria({ ...nuevaCategoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.nombreCategoriaProductos.trim()) {
      toast.error('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      let resultado;
      if (categoria) {
        resultado = await editarCategoria(categoria.idCat_productos, nuevaCategoria);
        if (resultado.success) {
          toast.success('Categoría editada correctamente');
        } else {
          toast.error(`Error al editar categoría: ${resultado.error}`);
          return;
        }
      } else {
        resultado = await agregarCategoria(nuevaCategoria);
        if (resultado.success) {
          toast.success('Categoría agregada correctamente');
        } else {
          toast.error(`Error al agregar categoría: ${resultado.error}`);
          return;
        }
      }

      // Limpiar el formulario
      setNuevaCategoria({ nombreCategoriaProductos: '' });
      // Refrescar la lista
      await obtenerCategorias();
      // Cerrar el modal
      document.querySelector('#categoriaModal .btn-close').click();
    } catch (error) {
      toast.error(`Error inesperado: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreCategoriaProductos" className="form-label">
            Nombre de la Categoría
          </label>
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