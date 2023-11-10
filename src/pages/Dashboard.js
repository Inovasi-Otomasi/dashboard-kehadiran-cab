import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrayekPie from "../components/TrayekPie";
import AbsenPie from "../components/AbsenPie";
import PendapatanGraph from "../components/PendapatanGraph";
import KaryawanTable from "../components/KaryawanTable";
import { DatePicker } from "antd";
import { Helmet } from "react-helmet";
import TestChart from "../components/TestChart";

const { RangePicker } = DatePicker;

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

      <div className="d-flex justify-content-between my-5">
        <div>
          <span>Pilih range data: </span>
          <RangePicker
          // onChange={handleChangeDebut}
          />
        </div>
        <div>
          <button
            className="btn btn-success btn-sm text-start"
            // onClick={getIssuesByRange}
            // value={[moment(startDate), moment(endDate)]}
          >
            Set Range
          </button>
          <span> </span>
          <button
            className="btn btn-danger btn-sm text-end"
            // onClick={resetIssues}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="d-lg-flex flex-row justify-content-between mb-5">
        <TestChart />
        {/* <TrayekPie /> */}
        <AbsenPie />
      </div>
      {/* <TestChart /> */}

      <PendapatanGraph />
      <KaryawanTable />
    </div>
  );
}

export default Dashboard;
