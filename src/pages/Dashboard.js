import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TrayekPie from "../components/TrayekPie";
import AbsenPie from "../components/AbsenPie";
import PendapatanGraph from "../components/PendapatanGraph";
import KaryawanTable from "../components/KaryawanTable";
import { DatePicker } from "antd";
import { Helmet } from "react-helmet";
import TestChart from "../components/TestChart";
import delamenta from "../api/delamenta";

const { RangePicker } = DatePicker;

const token = localStorage.getItem("token");
const dmtoken = localStorage.getItem("delamenta-token");

function Dashboard() {
  const navigate = useNavigate();
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();

  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState(currentDate);

  // for pie
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);

  const numbers = [];
  const codes = [];

  const [trayekData, setTrayekData] = useState([]);

  //for line
  const [sData, setSData] = useState([]);
  const [trayekDates, setTrayekDates] = useState([]);

  const dates = [];
  const temp = [];

  const resetData = async () => {
    window.location.reload();
  };

  const getData = async () => {
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta
        .get(`/trayek/table?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
          res.data.data.forEach((item) => {
            if (!dates.includes(item.tanggal.split("T")[0])) {
              dates.push(item.tanggal.split("T")[0]);
            }
          });

          const tanggalSaved = {};
          const hasil = {};

          for (const data of res.data.data) {
            if (!hasil.hasOwnProperty(data.trayek)) {
              hasil[data.trayek] = {};
            }

            const tanggal = data.tanggal;
            tanggalSaved[tanggal] = true;
            hasil[data.trayek][tanggal] = data.total_pendapatan;
          }

          const tanggalArr = Object.keys(tanggalSaved);

          for (const trayek in hasil) {
            hasil[trayek] = tanggalArr.map(
              (tanggal) => hasil[trayek][tanggal] ?? 0
            );
          }

          const keys = Object.keys(hasil);

          //line chart
          keys.forEach((key, index) => {
            temp.push({ name: key, data: hasil[key] });
          });

          setSData(temp);
          setTrayekDates(dates);

          //pie chart
          keys.forEach((key, index) => {
            trayekData.push({ name: key, data: hasil[key] });
          });

          trayekData.forEach((obj) => {
            const sum = obj.data.reduce((acc, curr) => acc + curr, 0);
            obj.data = sum;
          });
          trayekData.forEach((obj) => {
            codes.push(obj.name);
            numbers.push(obj.data);
          });

          setTrayekCodes(codes);
          setTrayekNumbers(numbers);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataByRange = async () => {
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      const rnumbers = [];
      const rcodes = [];

      const rdates = [];
      const rtemp = [];

      const rTrayekData = [];

      await delamenta
        .get(`/trayek/table?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
          res.data.data.forEach((item) => {
            if (!rdates.includes(item.tanggal.split("T")[0])) {
              rdates.push(item.tanggal.split("T")[0]);
            }
          });

          const tanggalSaved = {};
          const hasil = {};

          for (const data of res.data.data) {
            if (!hasil.hasOwnProperty(data.trayek)) {
              hasil[data.trayek] = {};
            }

            const tanggal = data.tanggal;
            tanggalSaved[tanggal] = true;
            hasil[data.trayek][tanggal] = data.total_pendapatan;
          }

          const tanggalArr = Object.keys(tanggalSaved);

          for (const trayek in hasil) {
            hasil[trayek] = tanggalArr.map(
              (tanggal) => hasil[trayek][tanggal] ?? 0
            );
          }

          const keys = Object.keys(hasil);

          //line chart
          keys.forEach((key, index) => {
            rtemp.push({ name: key, data: hasil[key] });
          });

          setSData(rtemp);
          setTrayekDates(rdates);

          //pie chart
          keys.forEach((key, index) => {
            rTrayekData.push({ name: key, data: hasil[key] });
          });

          rTrayekData.forEach((obj) => {
            const sum = obj.data.reduce((acc, curr) => acc + curr, 0);
            obj.data = sum;
          });
          rTrayekData.forEach((obj) => {
            rcodes.push(obj.name);
            rnumbers.push(obj.data);
          });

          setTrayekCodes(rcodes);
          setTrayekNumbers(rnumbers);
          Swal.fire({
            icon: "success",
            title: "Berhasil Load Data",
            text: `Range dari ${startDate} hingga ${endDate} `,
          });
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error,
        text: "Gagal mengload data",
      });
    }
  };

  const handleChangeDebut = (range) => {
    setStartDate(range[0].format("YYYY-MM-DD"));
    setEndDate(range[1].format("YYYY-MM-DD"));
    console.log(startDate, endDate);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getData();
  }, []);

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
          <RangePicker onChange={handleChangeDebut} />
        </div>
        <div>
          <button
            className="btn btn-success btn-sm text-start"
            onClick={getDataByRange}>
            Set
          </button>
          <span> </span>
          <button
            className="btn btn-danger btn-sm text-end"
            onClick={resetData}>
            Reset
          </button>
        </div>
      </div>

      <div className="d-lg-flex flex-row justify-content-between mb-5">
        <TestChart trayekCodes={trayekCodes} trayekNumbers={trayekNumbers} />
        {/* <TrayekPie /> */}
        <AbsenPie />
      </div>
      {/* <TestChart /> */}

      <PendapatanGraph trayekDates={trayekDates} sData={sData} />
      {/* <KaryawanTable /> */}
    </div>
  );
}

export default Dashboard;
