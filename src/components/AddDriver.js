import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = "/1.0.0/drivers";

function AddDriver() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const lvlmenu_options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const status_options = [
    { value: "Aktif", label: "Aktif" },
    { value: "Non-Aktif", label: "Non-Aktif" },
    { value: "Mengundurkan diri", label: "Mengundurkan diri" },
    { value: "Dipecat", label: "Dipecat" },
  ];

  const [shifts, setShifts] = useState([]);

  const getShift = async () => {
    try {
      await axios.get("/1.0.0/shifts").then((response) => {
        setShifts(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      getShift();

      setIsLoaded(true);
    }
  }, []);

  const [state, setState] = useState({
    number: null,
    name: "",
    nik: null,
    no_sim: null,
    rfid: "",
    shift_id: null,
    address: "",
    start_working: "",
    position: "",
    level_menu: "A",
    status: "Aktif",
    username: "",
    password: "",
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
      number: state.number,
      name: state.name,
      nik: state.nik,
      no_sim: state.no_sim,
      rfid: state.rfid,
      shift_id: state.shift_id,
      address: state.address,
      start_working: state.start_working,
      position: state.position,
      level_menu: state.level_menu,
      status: state.status,
      username: state.username,
      password: state.password,
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
        shift_id: 0,
        address: "",
        start_working: "",
        position: "",
        level_menu: "",
        status: "",
        username: "",
        password: "",
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
        <i className="fa fa-plus"></i>
      </button>
      <span
        className="px-2"
        style={{ fontSize: "1.1rem", fontWeight: "bolder" }}>
        Driver
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
                Data Driver
              </h1>
            </div>
            <div class="modal-body">
              <form
                class="row g-3 needs-validation px-5"
                novalidate
                autoComplete="off">
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
                    min="0"
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
                    placeholder="Contoh: "
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
                    placeholder="Contoh: "
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
                    placeholder="Contoh: "
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
                    placeholder="Contoh: "
                    name="rfid"
                    value={state.rfid}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Shift
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    required
                    onChange={(value) => handleChange(value)}
                    name="shift_id">
                    <option selected disabled>
                      Pilih disini
                    </option>
                    {shifts.map((shift) => (
                      <option value={shift.id}>{shift.id}</option>
                    ))}
                  </select>
                </div>

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: "
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
                  <label for="validationCustom03" class="form-label">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: "
                    name="position"
                    value={state.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Level Menu
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    required
                    onChange={(value) => handleChange(value)}
                    name="level_menu">
                    <option selected disabled>
                      Pilih Level Menu
                    </option>
                    {lvlmenu_options.map((level) => (
                      <option value={level.value}>{level.label}</option>
                    ))}
                  </select>
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

                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="Contoh: "
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="validationCustom03"
                    placeholder="********"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer d-flex flex-row justify-content-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDriver;
