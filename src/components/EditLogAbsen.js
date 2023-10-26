import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function EditLogAbsen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const remark_options = [
    { value: "Masuk", label: "Masuk" },
    { value: "Alpha", label: "Alpha" },
    { value: "Cuti", label: "Cuti" },
  ];

  const [state, setState] = useState({
    name: "",
    date: "",
    tap_in_time: "",
    tap_out_time: "",
    remark: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (!isLoaded) {
      axios
        .get("/1.0.0/shifts/" + id)
        .then((res) => {
          setState({
            ...state,
            name: res.data.name,
            date: res.data.date,
            tap_in_time: res.data.tap_in_time,
            tap_out_time: res.data.tap_out_time,
            remark: res.data.remark,
          });
        })
        .catch((err) => console.log(err));
      setIsLoaded(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = {
      name: state.name,
      date: state.date,
      tap_in_time: state.tap_in_time,
      tap_out_time: state.tap_out_time,
      remark: state.remark,
    };

    try {
      await axios.put(`/1.0.0/shifts/${id}`, logData);
      setState({
        name: "",
        date: "",
        tap_in_time: "",
        tap_out_time: "",
        remark: "",
      });
      Swal.fire({
        icon: "success",
        title: "Edit Data Log Absen",
        text: "Sukses mengedit log absen!",
      });
      setTimeout(function () {
        navigate("/driver");
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Log Absen",
        text: "Gagal mengedit log absen!",
      });
    }
  };

  return (
    <div className="container-fluid text-lg-start mb-4">
      <Helmet>
        <title>Data Absensi CAB | Edit Log Absen</title>
      </Helmet>

      <form
        className="row g-3 needs-validation"
        autoComplete="off"
        onSubmit={handleSubmit}>
        <h1>Edit Data</h1>

        <div class="col-md-6">
          <label for="validationNama" class="form-label">
            Nama
          </label>
          <input
            type="text"
            class="form-control"
            id="validationNama"
            placeholder="Bambang"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div class="col-md-6">
          <label for="validationTanggal" class="form-label">
            Tanggal
          </label>
          <input
            type="date"
            class="form-control"
            id="validationTanggal"
            placeholder="12/10/2023"
            name="date"
            value={state.date}
            onChange={handleChange}
            required
            disabled
          />
        </div>

        <div class="col-md-6">
          <label for="validationTapIn" class="form-label">
            Tap-In
          </label>
          <input
            type="time"
            class="form-control"
            id="validationTapIn"
            placeholder="00:00"
            name="tap_in_time"
            value={state.tap_in_time}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div class="col-md-6">
          <label for="validationTapOut" class="form-label">
            Tap-Out
          </label>
          <input
            type="time"
            class="form-control"
            id="validationTapOut"
            placeholder="00:00"
            name="tap_out_time"
            value={state.tap_out_time}
            onChange={handleChange}
            required
            disabled
          />
        </div>

        <div class="col-md-6">
          <label for="validationRemark" class="form-label">
            Remark
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="validationRemark"
            required
            onChange={(value) => handleChange(value)}
            value={state.remark}
            name="remark">
            <option selected disabled>
              Pilih Remark
            </option>
            {remark_options.map((remark) => (
              <option value={remark.value}>{remark.label}</option>
            ))}
          </select>
        </div>

        <div class="row g-3 pt-4">
          <div className="col-6 text-end">
            <Link to="/log-absen">
              <button className="btn btn-secondary">Kembali</button>
            </Link>
          </div>
          <div className="col-6 text-start">
            <button class="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditLogAbsen;
