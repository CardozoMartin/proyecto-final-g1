import React, { useState } from 'react'
import useCustomCliente from '../../../CustomHooks/CustomCliente/useCustomCliente';
import { toast } from 'sonner';

const FormClientes = () => {
    const { crearCliente,cliente, obtenerClientes } = useCustomCliente();
    const [nuevoCliente, setNuevoCliente] = useState({
        Nombre: '',
        Apellido: '',
        DNI: '',
        Telefono: '',
        Email: '',
        Domicilio: ''
    })
    // Handler para manejar los cambios en los campos del formulario
    const handleAgregarCliente = (e) => {
        e.preventDefault();
        setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
    }

    // Manejo del submit del formulario

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí podrías llamar a una función para agregar el cliente
        await crearCliente(nuevoCliente);
        // Reiniciar el formulario después de agregar
        setNuevoCliente({
            Nombre: '',
            Apellido: '',
            DNI: '',
            Telefono: '',
            Email: '',
            Domicilio: ''
        });
        // Mostrar mensaje de éxito
        toast.success("Cliente agregado correctamente");
        // Opcional: recargar la lista de clientes
        

    }

    return (
        <div>
            {/* Formulario para agregar o editar producto */}
            <form onSubmit={handleSubmit} className="p-3">
                {/* Campo: Nombre del Cliente */}
                <div className="mb-3">
                    <label htmlFor="Nombre" className="form-label">Nombre del Cliente</label>
                    <input
                        id="Nombre"
                        name="Nombre"
                        value={nuevoCliente.Nombre}
                        onChange={handleAgregarCliente}
                        placeholder="Ingrese el nombre del cliente"
                        className="form-control"
                        required
                    />
                </div>
                {/* Campo: Imagen producto */}
                <div className="mb-3">
                    <label htmlFor="Apellido" className="form-label">Apellido del Cliente</label>
                    <input
                        id="Apellido"
                        name="Apellido"
                        value={nuevoCliente.Apellido}
                        onChange={handleAgregarCliente}
                        placeholder="Ingrese el apellido del cliente"
                        className="form-control"
                        required
                    />
                </div>
                {/* Campo: Precio costo */}
                <div className="mb-3">
                    <label htmlFor="DNI" className="form-label">DNI</label>
                    <div className="input-group">

                        <input
                            id="DNI"
                            name="DNI"
                            value={nuevoCliente.DNI}
                            onChange={handleAgregarCliente}
                            placeholder="Ingrese el DNI del cliente"
                            className="form-control"
                            type="text"
                            required
                        />
                    </div>
                </div>
                {/* Campo: Descripción */}
                <div className="mb-3">
                    <label htmlFor="Telefono" className="form-label">Ingrese el telefono</label>
                    <input
                        id="Telefono"
                        name="Telefono"
                        value={nuevoCliente.Telefono}
                        onChange={handleAgregarCliente}
                        placeholder="Telefono del cliente"
                        className="form-control"
                        required
                    />
                </div>
                {/* Campo: Precio de venta */}
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email Cliente</label>
                    <div className="input-group">
                        <input
                            id="Email"
                            name="Email"
                            value={nuevoCliente.Email}
                            onChange={handleAgregarCliente}
                            placeholder="Ingrese el email del cliente"
                            className="form-control"
                            type="text"
                            required
                        />
                    </div>
                </div>
                {/* Campo: Cantidad y Categoría */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="Domicilio" className="form-label">Direccion</label>
                            <input
                                id="Domicilio"
                                name="Domicilio"
                                value={nuevoCliente.Domicilio}
                                onChange={handleAgregarCliente}
                                placeholder="Domicilio del cliente"
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
                        Agregar Cliente
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormClientes