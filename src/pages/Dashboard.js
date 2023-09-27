import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrayekPie from "../components/TrayekPie";
import AbsenPie from "../components/AbsenPie";
import PendapatanGraph from "../components/PendapatanGraph";
import KaryawanTable from "../components/KaryawanTable";
import DateRange from "../components/DateRange";
import { Helmet } from "react-helmet";

const token = localStorage.getItem("token");

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <div className="dashboard-wrapper py-4">
      <Helmet>
        <title>Data Absensi CAB | Dashboard</title>
      </Helmet>
      <div className="d-md-flex flex-row justify-content-around">
        <h1>Dashboard</h1>
      </div>
      <DateRange />
      <div className="d-md-flex flex-row justify-content-around">
        <TrayekPie />
        <AbsenPie />
      </div>
      <PendapatanGraph />
      <KaryawanTable />
    </div>
  );
}

export default Dashboard;
