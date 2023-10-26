import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function EditDriver() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const status_options = [
    { value: "Aktif", label: "Aktif" },
    { value: "Non-Aktif", label: "Non-Aktif" },
    { value: "Mengundurkan diri", label: "Mengundurkan diri" },
    { value: "Dipecat", label: "Dipecat" },
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (!isLoaded) {
      axios
        .get("/1.0.0/drivers/" + id)
        .then((res) =>
          setState({
            ...state,
            number: res.data.number,
            name: res.data.name,
            nik: res.data.nik,
            no_sim: res.data.no_sim,
            rfid: res.data.rfid,
            address: res.data.address,
            start_working: res.data.start_working,
            status: res.data.status,
          })
        )
        .catch((err) => console.log(err));

      setIsLoaded(true);
    }
  }, []);

  const [state, setState] = useState({
    number: null,
    name: "",
    nik: null,
    no_sim: null,
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
      number: state.number,
      name: state.name,
      nik: state.nik,
      no_sim: state.no_sim,
      rfid: state.rfid,

      address: state.address,
      start_working: state.start_working,

      status: state.status,
    };
    try {
      const response = await axios.put(`/1.0.0/drivers/${id}`, driverData);
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
        title: "Edit Data Driver",
        text: "Sukses mengedit driver!",
      });
      setTimeout(function () {
        navigate("/driver");
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Driver",
        text: "Gagal mengedit driver!",
      });
    }
  };

  return (
    <div className="container-fluid text-lg-start mb-4">
      <Helmet>
        <title>Data Absensi CAB | Edit Driver</title>
      </Helmet>

      <form
        class="row g-3 needs-validation"
        onSubmit={handleSubmit}
        autoComplete="off">
        <h1>Edit Data</h1>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Nomor
          </label>
          <input
            type="number"
            class="form-control"
            id="Contoh: "
            placeholder="123456"
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
          <label for="validationCustom04" class="form-label">
            Status
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            required
            onChange={(value) => handleChange(value)}
            value={state.status}
            name="status">
            <option selected disabled>
              Pilih Status
            </option>
            {status_options.map((stats) => (
              <option value={stats.value}>{stats.label}</option>
            ))}
          </select>
        </div>

        <div class="row g-3 pt-4">
          <div className="col-6 text-end">
            <Link to="/driver">
              <button className="btn btn-secondary">Kembali</button>
            </Link>
          </div>
          <div className="col-6 text-start">
            <button
              class="btn btn-success"
              type="button"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditDriver;
