import React, { useState, useEffect } from 'react'
import useCustomProductos from '../../../CustomHooks/useCustomProductos';
import { toast } from 'sonner';
import useCustomCategorias from '../../../CustomHooks/useCustomCategorias';
import Swal from 'sweetalert2';

// Ahora recibimos la prop producto para edición y onSuccess para cerrar el modal
const FormProductos = ({ producto, onSuccess }) => {
  const { agregarProducto, editarProducto } = useCustomProductos();
  const { categorias } = useCustomCategorias();
 
  const categoriasAMostrar = categorias.categorias || [];
  console.log('Categorias a mostrar:', categoriasAMostrar);

  // Estado para el formulario, inicializa vacío
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    precioCosto: '',
    descripcion: '',
    precioVenta: '',
    cantidadProducto: '',
    nombreCategoria: '',
    imagenProducto: '',
    estadoProductoNuevo: ''
  });

  // Estado para controlar si está procesando
  const [procesando, setProcesando] = useState(false);

  // Si recibimos un producto para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (producto) {
      setNuevoProducto({
        nombreProducto: producto.nombreProducto || '',
        precioCosto: producto.precioCosto || '',
        descripcion: producto.descripcion || '',
        precioVenta: producto.precioVenta || '',
        cantidadProducto: producto.cantidadProducto || '',
        nombreCategoria: producto.nombreCategoriaProductos || '',
        imagenProducto: producto.imagenProducto || '',
        estadoProductoNuevo: producto.estadoProductoNuevo || ''
      });
    } else {
      // Si no hay producto (modo agregar), limpiamos el formulario
      setNuevoProducto({
        nombreProducto: '',
        precioCosto: '',
        descripcion: '',
        precioVenta: '',
        cantidadProducto: '',
        nombreCategoria: '',
        imagenProducto: '',
        estadoProductoNuevo: ''
      });
    }
  }, [producto]);

  //-----------------------Handlers---------------------
  // Maneja los cambios en los campos del formulario
  const handleAgregarProducto = (e) => {
    e.preventDefault();
    setNuevoProducto({...nuevoProducto, [e.target.name]: e.target.value });
  }

  // Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
      if (producto) {
        // Preguntar antes de editar con SweetAlert
        const result = await Swal.fire({
          title: "¿Editar producto?",
          text: "¿Estás seguro de que deseas actualizar los datos de este producto?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, actualizar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        });

        if (!result.isConfirmed) {
          setProcesando(false);
          return;
        }

        const resultado = await editarProducto(producto.idProductos, nuevoProducto);
        if (resultado.success) {
          toast.success('Producto editado correctamente');
          setNuevoProducto({
            nombreProducto: '',
            precioCosto: '',
            descripcion: '',
            precioVenta: '',
            cantidadProducto: '',
            nombreCategoria: '',
            imagenProducto: '',
            estadoProductoNuevo: ''
          });
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast.error(`Error al editar producto: ${resultado.error}`);
        }
      } else {
        // Agregar producto nuevo
        const resultado = await agregarProducto(nuevoProducto);
        if (resultado.success) {
          toast.success('Producto agregado correctamente');
          setNuevoProducto({
            nombreProducto: '',
            precioCosto: '',
            descripcion: '',
            precioVenta: '',
            cantidadProducto: '',
            nombreCategoria: '',
            imagenProducto: '',
            estadoProductoNuevo: ''
          });
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast.error(`Error al agregar producto: ${resultado.error}`);
        }
      }
    } catch (error) {
      toast.error('Error inesperado al procesar la operación');
      console.error('Error en handleSubmit:', error);
    } finally {
      setProcesando(false);
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
            disabled={procesando}
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
            disabled={procesando}
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
              disabled={procesando}
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
            disabled={procesando}
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
              disabled={procesando}
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
                disabled={procesando}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nombreCategoria" className="form-label">Categoría</label>
              <select
                id="nombreCategoria"
                name="nombreCategoria"
                value={nuevoProducto.nombreCategoria}
                onChange={handleAgregarProducto}
                className="form-select"
                required
                disabled={procesando}
              >
                <option value="">Seleccione una categoría</option>
                {categoriasAMostrar.map(categoria => (
                  <option key={categoria.idCat_productos} value={categoria.nombreCategoriaProductos}>
                    {categoria.nombreCategoriaProductos}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Seleccione una categoría válida.
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="estadoProductoNuevo" className="form-label">Estado</label>
              <select
                id="estadoProductoNuevo"
                name="estadoProductoNuevo"
                value={nuevoProducto.estadoProductoNuevo}
                onChange={handleAgregarProducto}
                className="form-select"
                required
                disabled={procesando}
              >
                <option value="">Seleccione un estado</option>
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
              <div className="invalid-feedback">
                Seleccione un estado válido.
              </div>
            </div>
          </div>
        </div>
        {/* Botón de acción, cambia el texto según si es edición o alta */}
        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={procesando}
          >
            {procesando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Procesando...
              </>
            ) : (
              <>
                <i className="fas fa-plus me-2"></i>
                {producto ? 'Guardar Cambios' : 'Agregar Producto'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormProductos