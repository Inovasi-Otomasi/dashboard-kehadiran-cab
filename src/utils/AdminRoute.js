import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Error from "../pages/Error";
import Login from "../pages/Login";

const AdminRoutes = () => {
  const navigate = useNavigate();

  let auth = secureLocalStorage.getItem("role");

  if (auth === "admin") {
    return <Outlet />;
  } else {
    return <Login />;
  }
};

export default AdminRoutes;
