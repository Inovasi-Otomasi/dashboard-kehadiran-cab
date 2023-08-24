import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function EditShift() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    id: id,
    number: null,
    name: "",
    shift_start: "",
    shift_end: "",
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
    const shiftData = {
      number: state.number,
      name: state.name,
      shift_start: state.shift_start,
      shift_end: state.shift_end,
    };
    try {
      const response = await axios.put(`/1.0.0/shifts/${id}`, shiftData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        name: "",
        shift_start: "",
        shift_end: "",
      });
      Swal.fire({
        icon: "success",
        title: "Edit Data Shift",
        text: "Sukses mengedit shift!",
      });
      setTimeout(function () {
        navigate("/shift");
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Shift",
        text: "Gagal mengedit shift!",
      });
    }
  };

  useEffect(() => {
    axios
      .get("/1.0.0/shifts/" + id)
      .then((res) =>
        setState({
          ...state,
          number: res.data.number,
          name: res.data.name,
          shift_start: res.data.shift_start,
          shift_end: res.data.shift_end,
        })
      )
      .catch((err) => console.log(err));
    if (!state) {
      navigate("/shift");
    }
  }, []);

  return (
    <div className="container-fluid pt-4 text-lg-start">
      <Helmet>
        <title>Data Driver CAB | Edit Shift</title>
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
            Nama
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            placeholder="Axxxxx"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>

        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">
            Jam Mulai Shift
          </label>
          <input
            type="time"
            class="form-control"
            id="validationCustom03"
            placeholder="06:00:00"
            name="shift_start"
            value={state.shift_start}
            onChange={handleChange}
            required
          />
        </div>
        <div class="col-md-6">
          <label for="validationCustom04" class="form-label">
            Jam Selesai Shift
          </label>
          <input
            type="time"
            class="form-control"
            id="validationCustom03"
            placeholder="18:00:00"
            name="shift_end"
            value={state.shift_end}
            onChange={handleChange}
            required
          />
        </div>
      </form>
      <div class="d-flex flex-row justify-content-center p-4">
        <Link to="/shift">
          <button className="btn btn-secondary">Kembali</button>
        </Link>
        <button class="btn btn-dark" type="button" onClick={handleSubmit}>
          Edit Data
        </button>
      </div>
    </div>
  );
}

export default EditShift;
