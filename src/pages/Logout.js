import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const LOGOUT_URL = "/logout";

function Logout() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // check whether there's token ady then no need to login
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const handleLogout = async () => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      await api.post(LOGOUT_URL).then(() => {
        localStorage.removeItem("token");
        secureLocalStorage.removeItem("role");
        localStorage.removeItem("delamenta-token");
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Berhasil logout!",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Gagal",
        text: "Logout Error!",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Data Absensi CAB | Logout</title>
      </Helmet>

      <div
        class="container d-flex flex-column align-items-center justify-content-center"
        style={{ paddingTop: "15rem" }}>
        <h1 class="fw-bold py-4">Anda Yakin mau Logout?</h1>
        <button className="btn btn-dark" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
