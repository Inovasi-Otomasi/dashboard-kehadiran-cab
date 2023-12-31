import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.png";

const login_URL = "/login";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      secureLocalStorage.getItem("role") === "admin"
    ) {
      navigate("/dashboard");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios("http://103.165.135.134:6005/api/users/login", {
        method: "POST",

        data: {
          username: "reader30",
          password: "AdminDb1407!",
        },
      })
        .then((response) => {
          localStorage.setItem(
            "delamenta-token",
            response.data.data.token.split(" ")[1]
          );
        })
        .catch((e) => {
          console.log(e);
        });

      await api
        .post(
          login_URL,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        )
        .then((response) => {
          if (response.data.content.name === "admin") {
            localStorage.setItem("token", response.data.content.token);
            secureLocalStorage.setItem("role", response.data.content.name);
            Swal.fire({
              icon: "success",
              title: "Login Berhasil",
              text: "Berhasil login!",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire({
              icon: "error",
              title: "Login Gagal",
              text: "gagal login!",
            });
            setEmail("");
            setPassword("");
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Login Error!",
      });
    }
  };

  return (
    <div className="container-fluid">
      <Helmet>
        <title>Data Absensi CAB | Login</title>
      </Helmet>
      <div className="d-flex flex-row justify-content-center">
        <img src={logo} className="img-fluid" width={200} height={200} />
      </div>
      <h1 className="text-center">DATA ABSENSI CAB</h1>

      <form className="p-5" onSubmit={handleLogin}>
        <h3 className="text-center">Login</h3>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Alamat Email
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="exampleInputPassword"
            aria-describedby="passwordHelp"
            required
            autoComplete="off"
          />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" className="btn btn-success shadow rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
