import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = "/1.0.0/drivers";

function AddDriver() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const status_options = [
    { value: "Aktif", label: "Aktif" },
    { value: "Non-Aktif", label: "Non-Aktif" },
    { value: "Mengundurkan diri", label: "Mengundurkan diri" },
    { value: "Dipecat", label: "Dipecat" },
  ];

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, []);

  const [state, setState] = useState({
    number: null,
    name: "",
    nik: "",
    no_sim: "",
    rfid: "",
    address: "",
    start_working: "",
    status: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverData = {
      number: parseInt(state.number),
      name: state.name,
      nik: state.nik,
      no_sim: state.no_sim,
      rfid: state.rfid,
      address: state.address,
      start_working: state.start_working,
      status: state.status,
    };
    try {
      const response = await axios.post(BASE_URL, driverData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        name: "",
        nik: 0,
        no_sim: 0,
        rfid: "",
        address: "",
        start_working: "",
        status: "",
      });
      Swal.fire({
        icon: "success",
        title: "Menambahkan Data Driver",
        text: "Sukses menambahkan driver!",
      });
      setTimeout(function () {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Menambahkan Data Driver",
        text: "Gagal menambahkan Driver!",
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
        <i className="fa fa-plus"></i> Driver
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
                Data Driver
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
                    type="text"
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
                    Nama
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom02"
                    placeholder="Contoh: Bambang"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    NIK
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: 32750xxxxx"
                    name="nik"
                    value={state.nik}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Nomor SIM
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: 123xxxxxx"
                    name="no_sim"
                    value={state.no_sim}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    RFID
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: 123xxxxxx"
                    name="rfid"
                    value={state.rfid}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: Jakarta"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Tanggal Mulai Bekerja
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: "
                    name="start_working"
                    value={state.start_working}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Status
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    required
                    onChange={(value) => handleChange(value)}
                    name="status">
                    <option selected disabled>
                      Pilih Status
                    </option>
                    {status_options.map((stats) => (
                      <option value={stats.label}>{stats.label}</option>
                    ))}
                  </select>
                </div>

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

export default AddDriver;
