import { create } from "zustand";

const clientStore = create((set) => ({
  usuario: {
    nombre: "",
    apellido: "",
    fechaNac: "",
    direccion: "",
    correo: "",
    contraseña: "",
  },
  usuarios: [],

  setUsuario: (nuevoUsuario) =>
    set((state) => ({
      usuario: nuevoUsuario,
      usuarios: [...state.usuarios, nuevoUsuario],
    })),

  agregarUsuario: (nuevoUsuario) =>
    set((state) => ({
      usuarios: [...state.usuarios, nuevoUsuario],
    })),

  limpiarUsuario: () =>
    set({
      usuario: {
        nombre: "",
        apellido: "",
        fechaNac: "",
        direccion: "",
        correo: "",
        contraseña: "",
      },
    }),


}));

export default clientStore;


