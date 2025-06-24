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
  const handleAgregarProducto = (e) => {
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
      <input name="id" value={nuevoProducto.id} onChange={handleAgregarProducto} placeholder="SKU" />
      <input name="product" value={nuevoProducto.product} onChange={handleAgregarProducto} placeholder="Producto" />
      <input name="descripcion" value={nuevoProducto.descripcion} onChange={handleAgregarProducto} placeholder="Descripción" />
      <input name="imagen" value={nuevoProducto.imagen} onChange={handleAgregarProducto} placeholder="URL Imagen" />
      <input name="precio" value={nuevoProducto.precio} onChange={handleAgregarProducto} placeholder="Precio" />
      <input name="stock" value={nuevoProducto.stock} onChange={handleAgregarProducto} placeholder="Stock" />
      <button type="submit">Agregar</button>
    </form>
    </div>
  )
}

export default FormProductos