import React, { useState, useEffect } from 'react'
import useCustomProductos from '../../../CustomHooks/useCustomProductos';

import { toast } from 'sonner';

// Ahora recibimos la prop producto para edición
const FormProductos = ({ producto }) => {
  const { agregarProducto,editarProducto,obtenerProductos } = useCustomProductos();

  // Estado para el formulario, inicializa vacío
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    precio_costo: '',
    descripcion: '',
    precio_venta: '',
    cantidad_producto: '',
    nombre_categoria: ''
  });

  // Si recibimos un producto para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (producto) {
      setNuevoProducto({
        nombre_producto: producto.nombre_producto || '',
        precio_costo: producto.precio_costo || '',
        descripcion: producto.descripcion || '',
        precio_venta: producto.precio_venta || '',
        cantidad_producto: producto.cantidad_producto || '',
        nombre_categoria: producto.nombre_categoria || ''
      });
    } else {
      // Si no hay producto (modo agregar), limpiamos el formulario
      setNuevoProducto({
        nombre_producto: '',
        precio_costo: '',
        descripcion: '',
        precio_venta: '',
        cantidad_producto: '',
        nombre_categoria: ''
      });
    }
  }, [producto]);




  //-----------------------Handlers---------------------
  // Maneja los cambios en los campos del formulario
  const handleAgregarProducto = (e) => {
    e.preventDefault();

    //spin de carga de sweetalert2
    setNuevoProducto({...nuevoProducto, [e.target.name]: e.target.value });
   
  }
  // Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si hay producto, estamos en modo edición
    if (producto) {
      // Esperamos a que termine la edición antes de refrescar la lista
      const resultado = await editarProducto(producto.idProductos, nuevoProducto);
      if (resultado.success) {
        toast.success('Producto editado correctamente');
        setNuevoProducto({
          nombre_producto: '',
          precio_costo: '',
          descripcion: '',
          precio_venta: '',
          cantidad_producto: '',
          nombre_categoria: ''
        });
        // Solo refrescamos la lista si la edición fue exitosa
        await obtenerProductos();
      } else {
        toast.error(`Error al editar producto: ${resultado.error}`);
      }
    } else {
      // Agregar producto nuevo
      const resultado = await agregarProducto(nuevoProducto);
      if (resultado.success) {
        setNuevoProducto({
          nombre_producto: '',
          precio_costo: '',
          descripcion: '',
          precio_venta: '',
          cantidad_producto: '',
          nombre_categoria: ''
        });
        toast.success('Producto agregado correctamente');
      } else {
        toast.error(`Error al agregar producto: ${resultado.error}`);
      }
    }
  }
        
  //------------------------Render---------------------
  return (
    <div>
      {/* Formulario para agregar o editar producto */}
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre del producto */}
        <div className="mb-3">
          <label htmlFor="nombre_producto" className="form-label">Nombre del Producto</label>
          <input 
            id="nombre_producto"
            name="nombre_producto" 
            value={nuevoProducto.nombre_producto} 
            onChange={handleAgregarProducto} 
            placeholder="Ingrese el nombre del producto" 
            className="form-control"
            required
          />
        </div>
         {/* Campo: Imagen producto */}
        <div className="mb-3">
          <label htmlFor="imagen_producto" className="form-label">Imagen del Producto</label>
          <input 
            id="imagen_producto"
            name="imagen_producto" 
            value={nuevoProducto.imagen_producto} 
            onChange={handleAgregarProducto} 
            placeholder="Ingrese la URL de la imagen" 
            className="form-control"
            required
          />
        </div>
        {/* Campo: Precio costo */}
        <div className="mb-3">
          <label htmlFor="precio_costo" className="form-label">Precio Costo</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input 
              id="precio_costo"
              name="precio_costo" 
              value={nuevoProducto.precio_costo} 
              onChange={handleAgregarProducto} 
              placeholder="0.00" 
              className="form-control"
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        {/* Campo: Descripción */}
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea 
            id="descripcion"
            name="descripcion" 
            value={nuevoProducto.descripcion} 
            onChange={handleAgregarProducto} 
            placeholder="Descripción del producto" 
            className="form-control"
            rows="3"
            required
          />
        </div>
        {/* Campo: Precio de venta */}
        <div className="mb-3">
          <label htmlFor="precio_venta" className="form-label">Precio de Venta</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input 
              id="precio_venta"
              name="precio_venta" 
              value={nuevoProducto.precio_venta} 
              onChange={handleAgregarProducto} 
              placeholder="0.00" 
              className="form-control"
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        {/* Campo: Cantidad y Categoría */}
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cantidad_producto" className="form-label">Cantidad en Stock</label>
              <input 
                id="cantidad_producto"
                name="cantidad_producto" 
                value={nuevoProducto.cantidad_producto} 
                onChange={handleAgregarProducto} 
                placeholder="Cantidad disponible" 
                className="form-control"
                type="number"
                min="0"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nombre_categoria" className="form-label">Categoría</label>
              <input 
                id="nombre_categoria"
                name="nombre_categoria" 
                value={nuevoProducto.nombre_categoria} 
                onChange={handleAgregarProducto} 
                placeholder="Nombre de la categoría" 
                className="form-control"
                type="text"
                required
              />
            </div>
          </div>
        </div>
        {/* Botón de acción, cambia el texto según si es edición o alta */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            {producto ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormProductos