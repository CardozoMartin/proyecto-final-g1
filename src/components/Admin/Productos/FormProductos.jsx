import React, { useState, useEffect } from 'react'
import useCustomProductos from '../../../CustomHooks/useCustomProductos';

import { toast } from 'sonner';

// Ahora recibimos la prop producto para edición
const FormProductos = ({ producto }) => {
  const { agregarProducto,editarProducto,obtenerProductos } = useCustomProductos();

  // Estado para el formulario, inicializa vacío
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    precioCosto: '',
    descripcion: '',
    precioVenta: '',
    cantidadProducto: '',
    nombreCategoria: ''
  });

  // Si recibimos un producto para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (producto) {
      setNuevoProducto({
        nombreProducto: producto.nombreProducto || '',
        precioCosto: producto.precioCosto || '',
        descripcion: producto.descripcion || '',
        precioVenta: producto.precioVenta || '',
        cantidadProducto: producto.cantidadProducto || '',
        nombreCategoria: producto.nombreCategoria || ''
      });
    } else {
      // Si no hay producto (modo agregar), limpiamos el formulario
      setNuevoProducto({
        nombreProducto: '',
        precioCosto: '',
        descripcion: '',
        precioVenta: '',
        cantidadProducto: '',
        nombreCategoria: ''
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
          nombreProducto: '',
          precioCosto: '',
          descripcion: '',
          precioVenta: '',
          cantidadProducto: '',
          nombreCategoria: ''
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
          nombreProducto: '',
          precioCosto: '',
          descripcion: '',
          precioVenta: '',
          cantidadProducto: '',
          nombreCategoria: '',
          imagenProducto:''

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
          <label htmlFor="nombreProducto" className="form-label">Nombre del Producto</label>
          <input 
            id="nombreProducto"
            name="nombreProducto" 
            value={nuevoProducto.nombreProducto} 
            onChange={handleAgregarProducto} 
            placeholder="Ingrese el nombre del producto" 
            className="form-control"
            required
          />
        </div>
         {/* Campo: Imagen producto */}
        <div className="mb-3">
          <label htmlFor="imagenProducto" className="form-label">Imagen del Producto</label>
          <input 
            id="imagenProducto"
            name="imagenProducto" 
            value={nuevoProducto.imagenProducto} 
            onChange={handleAgregarProducto} 
            placeholder="Ingrese la URL de la imagen" 
            className="form-control"
            required
          />
        </div>
        {/* Campo: Precio costo */}
        <div className="mb-3">
          <label htmlFor="precioCosto" className="form-label">Precio Costo</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input 
              id="precioCosto"
              name="precioCosto" 
              value={nuevoProducto.precioCosto} 
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
          <label htmlFor="precioVenta" className="form-label">Precio de Venta</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input 
              id="precioVenta"
              name="precioVenta" 
              value={nuevoProducto.precioVenta} 
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
              <label htmlFor="cantidadProducto" className="form-label">Cantidad en Stock</label>
              <input 
                id="cantidadProducto"
                name="cantidadProducto" 
                value={nuevoProducto.cantidadProducto} 
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
              <label htmlFor="nombreCategoria" className="form-label">Categoría</label>
              <input 
                id="nombreCategoria"
                name="nombreCategoria" 
                value={nuevoProducto.nombreCategoria} 
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