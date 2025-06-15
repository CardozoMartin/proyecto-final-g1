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
  setUsuario: (nuevoUsuario) => set({ usuario: nuevoUsuario }),
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
