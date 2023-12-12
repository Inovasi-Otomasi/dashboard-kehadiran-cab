import React, { useEffect, useState } from "react";
import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import Places from "./MapInput";

const BASE_URL = "/1.0.0/routes";

function AddRoute() {
  // const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState([]);

  const [zoom, setZoom] = useState(10);

  const [vehicles, setVehicles] = useState([]);
  const [vehiclesData, setVehiclesData] = useState();

  const [state, setState] = useState({
    number: null,
    code: "",
    start_point: "",
    end_point: "",
    complete_route: "",
  });

  const getVehiclesList = () => {
    const temparray = [];

    try {
      axios
        .get(
          "http://127.0.0.1:8080/api/1.0.0/public/vehicle/?api_key=21232f297a57a5a743894a0e4a801fc3"
        )
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
      // localStorage.removeItem("token");
      // secureLocalStorage.removeItem("role");
      // localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e,
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSelect = (data) => {
    // let tempArray = data;
    // let tempArray2 = tempArray.map(({ value }) => ({ value }));
    setVehiclesData(data);
    console.log(vehiclesData);
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

  const onSelect = (lat, lng) => {
    setCoordinates((current) => [
      ...current,
      {
        lat: lat,
        lng: lng,
      },
    ]);
  };

  const resetCoordinates = () => {
    setCoordinates([]);
    setZoom(10);
    Swal.fire({
      icon: "success",
      title: "Berhasil reset data",
    });
  };

  // const deleteCoordinate = () => {
  //   await Swal.fire()
  // }

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
      const response = await api.post(BASE_URL, routeData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        code: "",
        start_point: "",
        end_point: "",
        total_income: 0,
        complete_route: "",
      });
      setCoordinates([]);
      setVehiclesData();
      Swal.fire({
        icon: "success",
        title: "Menambahkan Data Trayek",
        text: "Sukses menambahkan Trayek!",
      });
      setTimeout(function () {
        window.location.reload();
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Menambahkan Data Trayek",
        text: "Gagal menambahkan Trayek!",
      });
    }
  };

  useEffect(() => {
    getVehiclesList();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary shadow rounded"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        <i className="fa fa-plus"></i> Trayek
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Data Trayek
              </h1>
            </div>
            <div class="modal-body">
              <form
                class="row g-3 needs-validation px-5"
                onSubmit={handleSubmit}
                autoComplete="off">
                <div class="col-md-6">
                  <label for="validationCustom01" class="form-label">
                    Nomor
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="validationCustom01"
                    placeholder="Contoh: 123"
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
                    placeholder="Contoh: DPK-001"
                    name="code"
                    value={state.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Titik Awal Trayek
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: Depok"
                    name="start_point"
                    value={state.start_point}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Titik Akhir Trayek
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: Sudirman"
                    name="end_point"
                    value={state.end_point}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Trayek Komplit
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: Depok-Sudirman"
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
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <Places
                  onMapClick={onMapClick}
                  coordinates={coordinates}
                  zoom={zoom}
                  setZoom={setZoom}
                  resetCoordinates={resetCoordinates}
                  onSelect={onSelect}
                />

                <div class="row g-3 pt-4">
                  <div className="col-6 text-end mt-4">
                    <button
                      type="button"
                      class="btn btn-secondary shadow rounded"
                      data-bs-dismiss="modal">
                      Tutup
                    </button>
                  </div>
                  <div className="col-6 text-start mt-4">
                    <button
                      class="btn btn-success shadow rounded"
                      type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoute;
