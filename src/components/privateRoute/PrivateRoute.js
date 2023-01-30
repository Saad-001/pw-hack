import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem("userName");

  return user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
