// src/components/Auth/PublicRoute.jsx
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../store/useUser";

const RutasPublicas = () => {
  const { usuario } = useUser();
  return usuario ? <Navigate to="/" replace /> : <Outlet />;
};

export default RutasPublicas;
