import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

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
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      await axios.post(LOGOUT_URL).then(() => {
        localStorage.removeItem("token");
        secureLocalStorage.removeItem("role");
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Berhasil logout!",
        });
        setTimeout(function () {
          navigate("/");
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
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="fw-bold py-4">Anda Yakin mau Logout?</h1>
          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
