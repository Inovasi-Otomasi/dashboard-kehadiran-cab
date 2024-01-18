import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import api from "../api/axios";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");

function Example(props) {
  const [routes, setRoutes] = useState([]);

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/1.0.0/routes").then((res) => {
        setRoutes(res.data);
      });
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Carousel>
      {routes.map((route, i) => (
        <Item key={i} item={route} />
      ))}
    </Carousel>
  );
}

export default Example;
