import React, { useState } from 'react'
import useCustomCliente from '../../../CustomHooks/CustomCliente/useCustomCliente';
import { toast } from 'sonner';

const FormClientes = () => {
    const { crearCliente,cliente, obtenerClientes } = useCustomCliente();
    const [nuevoCliente, setNuevoCliente] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        DNI: '',
        telefonoCliente: '',
        emailCliente: '',
        domicilioCliente: ''
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
            nombreCliente: '',
            apellidoCliente: '',
            DNI: '',
            telefonoCliente: '',
            emailCliente: '',
            domicilioCliente: ''
        });
        // Mostrar mensaje de éxito
        toast.success("Cliente agregado correctamente");
        // Opcional: recargar la lista de clientes
        

    }

    return (
        <div>
            {/* Formulario para agregar o editar producto */}
            <form onSubmit={handleSubmit} className="p-3">
                {/* Campo: nombreCliente del Cliente */}
                <div className="mb-3">
                    <label htmlFor="nombreCliente" className="form-label">nombreCliente del Cliente</label>
                    <input
                        id="nombreCliente"
                        name="nombreCliente"
                        value={nuevoCliente.nombreCliente}
                        onChange={handleAgregarCliente}
                        placeholder="Ingrese el nombreCliente del cliente"
                        className="form-control"
                        required
                    />
                </div>
                {/* Campo: Imagen producto */}
                <div className="mb-3">
                    <label htmlFor="apellidoCliente" className="form-label">apellidoCliente del Cliente</label>
                    <input
                        id="apellidoCliente"
                        name="apellidoCliente"
                        value={nuevoCliente.apellidoCliente}
                        onChange={handleAgregarCliente}
                        placeholder="Ingrese el apellidoCliente del cliente"
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
                    <label htmlFor="telefonoCliente" className="form-label">Ingrese el telefonoCliente</label>
                    <input
                        id="telefonoCliente"
                        name="telefonoCliente"
                        value={nuevoCliente.telefonoCliente}
                        onChange={handleAgregarCliente}
                        placeholder="telefonoCliente del cliente"
                        className="form-control"
                        required
                    />
                </div>
                {/* Campo: Precio de venta */}
                <div className="mb-3">
                    <label htmlFor="emailCliente" className="form-label">emailCliente Cliente</label>
                    <div className="input-group">
                        <input
                            id="emailCliente"
                            name="emailCliente"
                            value={nuevoCliente.emailCliente}
                            onChange={handleAgregarCliente}
                            placeholder="Ingrese el emailCliente del cliente"
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
                            <label htmlFor="domicilioCliente" className="form-label">Direccion</label>
                            <input
                                id="domicilioCliente"
                                name="domicilioCliente"
                                value={nuevoCliente.domicilioCliente}
                                onChange={handleAgregarCliente}
                                placeholder="domicilioCliente del cliente"
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