import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

function EditRoute() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [state, setState] = useState({
    id: id,
    number: null,
    code: "",
    start_point: "",
    end_point: "",
    total_income: null,
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
    const routeData = {
      number: state.number,
      code: state.code,
      start_point: state.start_point,
      end_point: state.end_point,
      total_income: state.total_income,
    };
    try {
      const response = await axios.put(`/1.0.0/routes/${id}`, routeData);
      console.log(response.status, response.data);
      setState({
        number: 0,
        code: "",
        start_point: "",
        end_point: "",
        total_income: 0,
      });
      setTimeout(function () {
        navigate(-1);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("/1.0.0/routes/" + id)
      .then((res) =>
        setState({
          ...state,
          number: res.data.number,
          code: res.data.code,
          start_point: res.data.start_point,
          end_point: res.data.end_point,
          total_income: res.data.total_income,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid pt-4 text-lg-start">
      <form
        class="row g-3 needs-validation px-5"
        novalidate
        onSubmit={handleSubmit}
        autoComplete="off">
        <h1>Edit Data</h1>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">
            Nomor
          </label>
          <input
            type="text"
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

        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">
            Total Pendapatan
          </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom03"
            placeholder="1xxxxxxx"
            name="total_income"
            value={state.total_income}
            onChange={handleChange}
            required
          />
        </div>

        <div class="col-12 text-lg-end">
          <button class="btn btn-primary" type="submit">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRoute;
