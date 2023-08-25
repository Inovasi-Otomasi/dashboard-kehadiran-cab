import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Places from "./MapEdit";

function EditRoute() {
  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [coordinates, setCoordinates] = useState([]);

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

  const onMapClick = (e) => {
    setCoordinates((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  };

  const resetCoordinates = () => {
    setCoordinates([]);
  };

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
    }
  };

  const deleteCoordinates = (i) => {
    let newCoordinates = coordinates;
    newCoordinates.splice(i, 1);
    setCoordinates(newCoordinates);
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
    };
    try {
      const response = await axios.put(`/1.0.0/routes/${id}`, routeData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        code: "",
        start_point: "",
        end_point: "",
        complete_route: "",
      });
      setCoordinates([]);
      Swal.fire({
        icon: "success",
        title: "Edit Data Rute",
        text: "Sukses mengedit rute!",
      });
      setTimeout(function () {
        navigate("/location");
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Rute",
        text: "Gagal mengedit rute!",
      });
    }
  };

  useEffect(() => {
    getCoordinates();
    getData();
  }, []);

  return (
    <div className="container-fluid py-4">
      <Helmet>
        <title>Data Driver CAB | Edit Rute</title>
      </Helmet>
      <form class="row g-3 needs-validation px-5" novalidate autoComplete="off">
        <h1>Edit Data</h1>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Nomor
          </label>
          <input
            type="number"
            class="form-control"
            id="validationCustom01"
            placeholder="123456"
            name="number"
            value={state.number}
            onChange={handleChange}
            required
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
            placeholder="Axxxxx"
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
            placeholder="Depok"
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
            placeholder="Kemanggisan"
            name="end_point"
            value={state.end_point}
            onChange={handleChange}
            required
          />
        </div>

        <div class="col-md-12">
          <label for="validationCustom04" class="form-label">
            Rute Complete
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="Kemanggisan-Depok"
            name="complete_route"
            value={state.complete_route}
            onChange={handleChange}
            required
          />
        </div>

        <Places
          onMapClick={onMapClick}
          resetCoordinates={resetCoordinates}
          coordinates={coordinates}
          deleteCoordinate={deleteCoordinates}
        />
      </form>
      <div class="row g-3 pt-4">
        <div className="col-6 text-end">
          <Link to="/location">
            <button className="btn btn-secondary">Kembali</button>
          </Link>
        </div>
        <div className="col-6 text-start">
          <button class="btn btn-dark" type="button" onClick={handleSubmit}>
            Edit Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRoute;
