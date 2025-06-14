import React from 'react'
import { useState } from 'react'


const FormProductos = ({onAgregar}) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    id: '',
    product: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: ''
  });
  const handleChange = (e) => {
    setNuevoProducto({...nuevoProducto, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(onAgregar){
      onAgregar(nuevoProducto);
    }
  }
     
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input name="id" value={nuevoProducto.id} onChange={handleChange} placeholder="SKU" />
      <input name="product" value={nuevoProducto.product} onChange={handleChange} placeholder="Producto" />
      <input name="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input name="imagen" value={nuevoProducto.imagen} onChange={handleChange} placeholder="URL Imagen" />
      <input name="precio" value={nuevoProducto.precio} onChange={handleChange} placeholder="Precio" />
      <input name="stock" value={nuevoProducto.stock} onChange={handleChange} placeholder="Stock" />
      <button type="submit">Agregar</button>
    </form>
    </div>
  )
}

export default FormProductos