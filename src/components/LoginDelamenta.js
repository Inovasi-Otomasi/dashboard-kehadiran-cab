import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

function LoginDelamenta() {
  const testURL = "http://38.47.76.208:3006/api/users/login";
  const myInit = {
    email: "reader30",
    password: "AdminDb1407!",
    method: "POST",
    mode: "no-cors",
  };

  const myRequest = new Request(testURL, myInit);
  fetch(myRequest)
    .then(function (response) {
      return response;
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (e) {
      console.log(e);
    });

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios("http://38.47.76.208:3006/api/users/login", {
      email: "reader30",
      password: "AdminDb1407!",
      method: "POST",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "same-origin",
      crossdomain: true,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    // .post(
    //   "http://38.47.76.208:3006/api/users/login",
    //   {
    //     email: "reader30",
    //     password: "AdminDb1407!",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "*",
    //       "Access-Control-Allow-Methods": "*",
    //     },
    //   }
    // )

    //     .then((response) => {
    //       if (response.data.status === "success") {
    //         localStorage.setItem("dtToken", response.data.data.token);
    //         Swal.fire({
    //           icon: "success",
    //           title: "Login Berhasil",
    //           text: "Berhasil login!",
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Login Gagal",
    //           text: "gagal login!",
    //         });
    //       }
    //     });
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Login Gagal",
    //     text: "Login Error!",
    //   });
    // }
  };

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleLogin}>
        LOGIN DELAMENTA
      </button>
    </>
  );
}

export default LoginDelamenta;
