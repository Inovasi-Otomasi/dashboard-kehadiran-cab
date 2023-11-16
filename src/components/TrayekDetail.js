import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./TrayekMap";
import secureLocalStorage from "react-secure-storage";
import axios from "../api/axios";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

function TrayekDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [state, setState] = useState({
    id: id,
    number: 0,
    code: "",
    complete_route: "",
  });

  const [coordinates, setCoordinates] = useState([]);

  const getData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("/1.0.0/routes/" + id).then((res) => {
        setState({
          ...state,
          number: res.data.number,
          code: res.data.code,
          start_point: res.data.start_point,
          end_point: res.data.end_point,
          complete_route: res.data.complete_route,
        });
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  const getCoordinates = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("1.0.0/routes/" + id).then((res) => {
        setCoordinates(JSON.parse(res.data.coordinates));
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      getCoordinates();
      getData();

      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="container-fluid">
      <Helmet>
        <title>Data Absensi CAB | Detail Trayek</title>
      </Helmet>
      <h1 className="text-center mb-4">Detail Trayek {id}</h1>
      <Map coordinates={coordinates} />
      <div className="row g-3 text-center">
        <div className="col-md-6">
          <label>Kode Trayek</label>
          <h5>{state.code}</h5>
        </div>
        <div className="col-md-6">
          <label>Trayek Komplit</label>
          <h5>{state.complete_route}</h5>
        </div>

        <div className="col-md-6">
          <label>Total Pendapatan</label>
          <h5>Rp. {state.number}</h5>
        </div>
        <div className="col-md-6">
          <label>Total Transaksi</label>
          <h5>10</h5>
        </div>

        <div className="col-12">
          <label>Unit</label>
          <h5>B 4204 DB</h5>
        </div>

        <div class="col-12 pt-5">
          <button
            class="btn btn-secondary"
            type="submit"
            onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrayekDetail;
