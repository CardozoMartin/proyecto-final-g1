import React, { useState, useEffect } from 'react';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias.jsx';
import { toast } from 'sonner';

const FormCategorias = ({ categoria }) => {
  const { agregarCategoria, editarCategoria, obtenerCategorias } = useCustomCategorias();
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombreCategoriaProductos: '',
    imagenCategoriaProductos: '',
    estado: 'activo'
  });

  useEffect(() => {
    if (categoria) {
      setNuevaCategoria({
        nombreCategoriaProductos: categoria.nombreCategoriaProductos || '',
        imagenCategoriaProductos: categoria.imagenCategoriaProductos || '',
        estado: categoria.estado || 'activo'
      });
    } else {
      setNuevaCategoria({
        nombreCategoriaProductos: '',
        imagenCategoriaProductos: '',
        estado: 'activo'
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

    setNuevaCategoria({ nombreCategoriaProductos: '', imagenCategoriaProductos: '', estado: 'activo' });
    await obtenerCategorias();
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
        <div className="mb-3">
          <label htmlFor="imagenCategoriaProductos" className="form-label">
            Imagen de la Categoría (Opcional)
          </label>
          <input
            id="imagenCategoriaProductos"
            name="imagenCategoriaProductos"
            value={nuevaCategoria.imagenCategoriaProductos}
            onChange={handleAgregarCategoria}
            placeholder="Ingrese la URL de la imagen"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={nuevaCategoria.estado}
            onChange={handleAgregarCategoria}
            className="form-select"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
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