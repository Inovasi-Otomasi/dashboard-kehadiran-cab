import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import AbsenPie from "../components/AbsenPie";
import PendapatanGraph from "../components/PendapatanGraph";
import KaryawanTable from "../components/KaryawanTable";
import { DatePicker } from "antd";
import { Helmet } from "react-helmet";
import TestChart from "../components/TestChart";
import delamenta from "../api/delamenta";
import dayjs from "dayjs";
import secureLocalStorage from "react-secure-storage";
import VehicleList from "../components/VehicleList";
import Carousel from "../components/Carousel";

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

  let startofMonth = `${currentYear}-${currentMonth}-01`;

  const [startDate, setStartDate] = useState(startofMonth);
  const [endDate, setEndDate] = useState(currentDate);

  // for pie
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);

  const numbers = [];
  const codes = [];

  const [trayekData, setTrayekData] = useState([]);
  const [fTrayekData, setFTrayekData] = useState([]);

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
          const trak = {};

          for (const data of res.data.data) {
            if (!hasil.hasOwnProperty(data.trayek)) {
              hasil[data.trayek] = {};
            }

            if (!trak.hasOwnProperty(data.trayek)) {
              trak[data.trayek] = {};
            }

            const tanggal = data.tanggal;
            tanggalSaved[tanggal] = true;
            hasil[data.trayek][tanggal] = data.total_pendapatan;
            trak[data.trayek][tanggal] = data.total_transaksi;
          }

          const tanggalArr = Object.keys(tanggalSaved);

          for (const trayek in hasil) {
            hasil[trayek] = tanggalArr.map(
              (tanggal) => hasil[trayek][tanggal] ?? 0
            );
          }

          for (const trayek in trak) {
            trak[trayek] = tanggalArr.map(
              (tanggal) => trak[trayek][tanggal] ?? 0
            );
          }

          const keys = Object.keys(hasil);
          const key = Object.keys(trak);

          //line chart
          keys.forEach((key, index) => {
            temp.push({ name: key, data: hasil[key] });
          });

          setSData(temp);
          setTrayekDates(dates);

          //pie chart
          keys.forEach((key, index) => {
            trayekData.push({ value: trak[key], name: key });
          });

          trayekData.forEach((obj) => {
            const sum = obj.value.reduce((acc, curr) => acc + curr, 0);
            obj.value = sum;
          });
          trayekData.forEach((obj) => {
            codes.push(obj.name);
            numbers.push(obj.value);
          });

          setTrayekCodes(codes);
          setTrayekNumbers(numbers);
        });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Coba login kembali",
      });
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
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
          const trak = {};

          for (const data of res.data.data) {
            if (!hasil.hasOwnProperty(data.trayek)) {
              hasil[data.trayek] = {};
            }

            if (!trak.hasOwnProperty(data.trayek)) {
              trak[data.trayek] = {};
            }

            const tanggal = data.tanggal;
            tanggalSaved[tanggal] = true;
            hasil[data.trayek][tanggal] = data.total_pendapatan;
            trak[data.trayek][tanggal] = data.total_transaksi;
          }

          const tanggalArr = Object.keys(tanggalSaved);

          console.log(tanggalArr);

          for (const trayek in hasil) {
            hasil[trayek] = tanggalArr.map(
              (tanggal) => hasil[trayek][tanggal] ?? 0
            );
          }

          for (const trayek in trak) {
            trak[trayek] = tanggalArr.map(
              (tanggal) => trak[trayek][tanggal] ?? 0
            );
          }

          const keys = Object.keys(hasil);
          const key = Object.keys(trak);

          console.log(keys);
          console.log(key);

          //line chart
          keys.forEach((key, index) => {
            rtemp.push({ name: key, data: hasil[key] });
          });

          console.log(rtemp);

          setSData(rtemp);
          setTrayekDates(rdates);

          //pie chart
          keys.forEach((key, index) => {
            rTrayekData.push({ value: trak[key], name: key });
          });

          rTrayekData.forEach((obj) => {
            const sum = obj.value.reduce((acc, curr) => acc + curr, 0);
            obj.value = sum;
          });

          rTrayekData.forEach((obj) => {
            rcodes.push(obj.name);
            rnumbers.push(obj.value);
          });
          setTrayekData(rTrayekData);
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
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Data Absensi CAB | Dashboard</title>
      </Helmet>
      <label className="mb-3">CAB/Performance</label>

      <h1>Performance</h1>

      <hr />

      <div className="d-flex justify-content-between my-4">
        <div>
          <div>
            <RangePicker
              onChange={handleChangeDebut}
              defaultValue={[dayjs(startofMonth), dayjs(currentDate)]}
              allowClear={false}
            />
            <span> </span>
            <button
              className="btn btn-success btn-sm shadow rounded"
              onClick={getDataByRange}>
              Set
            </button>
            <span> </span>
            <button
              className="btn btn-danger btn-sm shadow rounded"
              onClick={resetData}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="d-lg-flex flex-row justify-content-between gap-5 mb-5">
        <div className="container">
          <TestChart
            trayekCodes={trayekCodes}
            trayekNumbers={trayekNumbers}
            trayekData={trayekData}
          />
        </div>

        <div className="container">
          <AbsenPie />
        </div>
      </div>

      <PendapatanGraph trayekDates={trayekDates} sData={sData} />
      {/* <KaryawanTable /> */}

      <h1 className="mt-5">List Kendaraan</h1>
      <hr />

      <VehicleList />

      <br />

      <Carousel />
    </div>
  );
}

export default Dashboard;
