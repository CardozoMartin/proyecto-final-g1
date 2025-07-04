// src/components/Auth/PrivateRoute.jsx

import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../store/useUser";

const RutasPrivadas = () => {
  const { usuario } = useUser();
  return usuario ? <Outlet /> : <Navigate to="/" replace />;
};

export default RutasPrivadas;
