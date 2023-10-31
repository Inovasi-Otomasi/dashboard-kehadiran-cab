import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

function LoginDelamenta() {
  // const testURL = "http://38.47.76.208:3006/api/users/login";
  // const myInit = {
  //   email: "reader30",
  //   password: "AdminDb1407!",
  //   method: "POST",
  //   mode: "no-cors",
  // };

  // const myRequest = new Request(testURL, myInit);
  // fetch(myRequest)
  //   .then(function (response) {
  //     return response;
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (e) {
  //     console.log(e);
  //   });

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios("http://38.47.76.208:3007/api/users/login", {
      method: "POST",

      data: {
        username: "reader30",
        password: "AdminDb1407!",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login Delamenta
      </button>
    </>
  );
}

export default LoginDelamenta;
