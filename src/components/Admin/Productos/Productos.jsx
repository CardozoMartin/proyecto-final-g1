import React from "react";
import { useState } from "react";
import FormProductos from "./FormProductos";

const Productos = () => {
  const [productos, setProductos] = useState([
    {
      id: "#001",
      product: "maquina",
      descripcion: "el mejor producto",
      imagen:"https://www.example.com/imagen1.jpg",
      precio: "$699",
      stock: "6",
    },
    {
      id: "#002",
      product: "amoladora",
      descripcion: "alta gamma",
      imagen:"https://www.example.com/imagen2.jpg",
      precio: "$1,299",
      stock: "2",
    },
    {
      id: "#003",
      product: "cortadora de cesped",
      descripcion: "una genialidad",
      imagen:"https://www.example.com/imagen3.jpg",
      precio: "$399",
      stock: "3",
    },
    {
      id: "#004",
      product: "sopladora de hoja",
      descripcion: "se escuchan re piola",
      imagen:"https://www.example.com/imagen4.jpg",
      precio: "$199",
      stock: "6",
    },
    {
      id: "#005",
      product: "nivel laser",
      descripcion: "se ve re piola",
      imagen:"https://www.example.com/imagen5.jpg",
      precio: "$299",
      stock: "8",
    },
  ]);
  const handleAgregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white d-flex justify-content-between aling-items-center">
            <h5 className="card-title mb-0">Productos</h5>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >   Agregar nuevo Prodcuto  </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Imagen</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <code>{prod.id}</code>
                      </td>
                      <td>{prod.product}</td>
                      <td>{prod.descripcion}</td>
                      <td>{prod.imagen}</td>
                      <td className="fw-bold">{prod.precio}</td>
                      <td className="fw-bold">{prod.stock}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-outline-primary btn-sm">
                            Editar
                          </button>
                          <button className="btn btn-outline-primary btn-sm">
                            Ver
                          </button>
                          <button className="btn btn-outline-primary btn-sm">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true" >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body"><FormProductos onAgregar={handleAgregarProducto}></FormProductos></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
