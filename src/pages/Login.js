import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

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
      await axios
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
              navigate("/dashboard");
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
      <form className="p-5" onSubmit={handleLogin}>
        <h1 className="text-center">Login</h1>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
