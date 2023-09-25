import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Helmet } from "react-helmet";

function DriverDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    id: id,
    number: 0,
    name: "",
    nik: "",
    no_sim: "",
    rfid: "",
    shift_id: 0,
    address: "",
    start_working: "",
    position: "",
    level_menu: "",
    status: "",
    username: "",
  });

  useEffect(() => {
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
          shift_id: res.data.shift_id,
          address: res.data.address,
          start_working: res.data.start_working,
          position: res.data.position,
          level_menu: res.data.level_menu,
          username: res.data.username,
          status: res.data.status,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <Helmet>
        <title>Data Absensi CAB | Detail Driver</title>
      </Helmet>
      <h1 className="text-center mb-4">Detail Driver {state.number}</h1>
      <div className="row g-3 text-center">
        <div className="col-md-6">
          <label>Nama</label>
          <h3>{state.name}</h3>
        </div>
        <div className="col-md-6">
          <label>Nomor</label>
          <h3>{state.number}</h3>
        </div>

        <div className="col-md-6">
          <label>NIK</label>
          <h3>{state.nik}</h3>
        </div>
        <div className="col-md-6">
          <label>Nomor SIM</label>
          <h3>{state.no_sim}</h3>
        </div>

        <div className="col-md-6">
          <label>RFID</label>
          <h3>{state.rfid}</h3>
        </div>
        <div className="col-md-6">
          <label>ID Shift</label>
          <h3>{state.shift_id}</h3>
        </div>

        <div className="col-md-6">
          <label>Alamat</label>
          <h3>{state.address}</h3>
        </div>
        <div className="col-md-6">
          <label>Tanggal Mulai Bekerja</label>
          <h3>{state.start_working}</h3>
        </div>

        <div className="col-md-6">
          <label>Username</label>
          <h3>{state.username}</h3>
        </div>

        <div className="col-md-6">
          <label>Jabatan</label>
          <h3>{state.position}</h3>
        </div>

        <div className="col-md-6">
          <label>Level Menu</label>
          <h3>{state.level_menu}</h3>
        </div>
        <div className="col-md-6">
          <label>Status</label>
          <h3>{state.status}</h3>
        </div>

        <div class="col-12 pt-5">
          <button
            class="btn btn-secondary"
            type="submit"
            onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverDetail;
