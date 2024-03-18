import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Places from "./MapEdit";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import axios from "axios";

function EditRoute() {
  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [coordinates, setCoordinates] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [vehiclesData, setVehiclesData] = useState();
  const [vehicles, setVehicles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, setState] = useState({
    id: id,
    number: null,
    code: "",
    start_point: "",
    end_point: "",
    complete_route: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const getVehiclesList = () => {
    const temparray = [];

    try {
      axios
        .get("https://demo.colinn.id:8899/api/1.0.0/public/vehicle", {
          params: {
            api_key: "21232f297a57a5a743894a0e4a801fc3",
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log(res.data);
          res.data.map((item) => {
            temparray.push({ value: item.id, label: item.no_plat });
          });
          console.log(temparray);
          setVehicles(temparray);
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
        window.location.reload();
      }, 1000);
    }
  };

  const handleSelect = (data) => {
    // let tempArray = data;
    // let tempArray2 = tempArray.map(({ value }) => ({ value }));
    setVehiclesData(data);
    console.log(vehiclesData);
  };

  const onMapClick = (e) => {
    if (coordinates === null) {
      setCoordinates([
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ]);
    } else {
      setCoordinates((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      ]);
    }
  };

  const onSelect = (lat, lng) => {
    if (coordinates === null) {
      setCoordinates([
        {
          lat: lat,
          lng: lng,
        },
      ]);
    } else {
      setCoordinates((current) => [
        ...current,
        {
          lat: lat,
          lng: lng,
        },
      ]);
    }
  };

  const resetCoordinates = () => {
    setCoordinates([]);
    setZoom(10);
    Swal.fire({
      icon: "success",
      title: "Berhasil reset data",
    });
  };

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.get("/1.0.0/routes/" + id).then((res) => {
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
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.get("1.0.0/routes/" + id).then((res) => {
        if (res.data.coordinates.length > 0) {
          setCoordinates(JSON.parse(res.data.coordinates));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getVehicles = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.get("1.0.0/routes/" + id).then((res) => {
        if (res.data.vehicles.length > 0) {
          setVehiclesData(JSON.parse(res.data.vehicles));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCoordinates = (i) => {
    coordinates.splice(i, 1);
    setCoordinates(coordinates);
  };

  const onMarkerDragStart = (i) => {
    coordinates.filter((item) => item !== i);
  };

  const onMarkerDragEnd = (event) => {
    setCoordinates((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routeData = {
      number: state.number,
      code: state.code,
      start_point: state.start_point,
      end_point: state.end_point,
      complete_route: state.complete_route,
      coordinates: coordinates,
      vehicles: vehiclesData,
    };
    try {
      const response = await api.put(`/1.0.0/routes/${id}`, routeData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        code: "",
        start_point: "",
        end_point: "",
        complete_route: "",
      });
      setCoordinates([]);
      setVehiclesData();
      Swal.fire({
        icon: "success",
        title: "Edit Data Trayek",
        text: "Sukses mengedit trayek!",
      });
      setTimeout(function () {
        navigate("/location");
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Trayek",
        text: "Gagal mengedit trayek!",
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (!isLoaded) {
      getCoordinates();
      getVehicles();
      getVehiclesList();
      getData();

      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="container-fluid py-4">
      <Helmet>
        <title>Data Absensi CAB | Edit Rute</title>
      </Helmet>
      <form class="row g-3 needs-validation" autoComplete="off">
        <h1>Edit Data</h1>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Nomor
          </label>
          <input
            type="number"
            class="form-control"
            id="validationCustom01"
            placeholder="Contoh: "
            name="number"
            value={state.number}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div class="col-md-6">
          <label for="validationCustom02" class="form-label">
            Kode
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            placeholder="Contoh: "
            name="code"
            value={state.code}
            onChange={handleChange}
            required
          />
        </div>

        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">
            Titik Awal Rute
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Contoh: "
            name="start_point"
            value={state.start_point}
            onChange={handleChange}
            required
          />
        </div>
        <div class="col-md-6">
          <label for="validationCustom04" class="form-label">
            Titik Akhir Rute
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Contoh: "
            name="end_point"
            value={state.end_point}
            onChange={handleChange}
            required
          />
        </div>

        <div class="col-md-6">
          <label for="validationCustom04" class="form-label">
            Trayek Lengkap
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Contoh: "
            name="complete_route"
            value={state.complete_route}
            onChange={handleChange}
            required
          />
        </div>
        <div class="col-md-6">
          <label for="validationCustom04" class="form-label">
            Kendaraan
          </label>
          <Select
            isMulti
            placeholder="Pilih Kendaraan (Bisa lebih dari 1)"
            value={vehiclesData}
            onChange={handleSelect}
            isSearchable={true}
            options={vehicles}
            className="basic-multi-select selector-container"
            classNamePrefix="select"
          />
        </div>

        <Places
          onMapClick={onMapClick}
          resetCoordinates={resetCoordinates}
          coordinates={coordinates}
          deleteCoordinate={deleteCoordinates}
          zoom={zoom}
          setZoom={setZoom}
          onSelect={onSelect}
          onMarkerDragEnd={onMarkerDragEnd}
          onMarkerDragStart={onMarkerDragStart}
        />
      </form>
      <div class="row g-3 pt-4">
        <div className="col-6 text-end">
          <Link to="/location">
            <button className="btn btn-secondary shadow rounded">
              Kembali
            </button>
          </Link>
        </div>
        <div className="col-6 text-start">
          <button
            class="btn btn-success shadow rounded"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRoute;
