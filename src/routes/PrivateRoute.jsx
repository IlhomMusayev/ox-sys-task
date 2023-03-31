import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useToken from "../hooks/useToken";

const PrivateRoute = () => {
  const [token] = useToken(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
