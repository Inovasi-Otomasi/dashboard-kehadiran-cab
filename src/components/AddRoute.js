import React, { useState } from "react";
import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Places from "./MapInput";

const BASE_URL = "/1.0.0/routes";

function AddRoute() {
  // const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState([]);

  const [zoom, setZoom] = useState(10);

  const [state, setState] = useState({
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
    };
    try {
      const response = await axios.post(BASE_URL, routeData);
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

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary shadow rounded"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        <i className="fa fa-plus"></i>
      </button>
      <span
        className="px-2"
        style={{ fontSize: "1.1rem", fontWeight: "bolder" }}>
        Trayek
      </span>

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

                <div class="col-md-12">
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
                      class="btn btn-secondary"
                      data-bs-dismiss="modal">
                      Tutup
                    </button>
                  </div>
                  <div className="col-6 text-start mt-4">
                    <button class="btn btn-success" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div class="modal-footer d-flex flex-row justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Tutup
              </button>
              <button
                class="btn btn-success"
                type="submit"
                onClick={handleSubmit}>
                Submit
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoute;
