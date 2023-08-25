import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const AdminRoutes = () => {
  const navigate = useNavigate();

  let auth = secureLocalStorage.getItem("role");

  if (auth === "admin") {
    return <Outlet />;
  } else {
    navigate("*");
  }
};

export default AdminRoutes;
