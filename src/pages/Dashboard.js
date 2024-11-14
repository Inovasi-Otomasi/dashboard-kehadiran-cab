import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import AbsenPie from "../components/AbsenPie";
import PendapatanGraph from "../components/PendapatanGraph";
// import KaryawanTable from "../components/KaryawanTable";
import { DatePicker } from "antd";
import { Helmet } from "react-helmet";
import TestChart from "../components/TestChart";
import delamenta from "../api/delamenta";
import dayjs from "dayjs";
import secureLocalStorage from "react-secure-storage";
import VehicleList from "../components/VehicleList";
import Carousel from "../components/Carousel";
import axios from "../api/axios";

import moment from "moment";

const { RangePicker } = DatePicker;

const token = localStorage.getItem("token");
const dmtoken = localStorage.getItem("delamenta-token");

const GET_URL = "/1.0.0/shifts_datatables";

function Dashboard() {
  const navigate = useNavigate();
  const date = new Date();

  let currentDay = String(date.getDate() + 1).padStart(2, "0");
  let currentDayV2 = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();

  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  let currentDateV2 = `${currentYear}-${currentMonth}-${currentDayV2}`;

  let startofMonth = `${currentYear}-${currentMonth}-01`;

  const [startDate, setStartDate] = useState(startofMonth);
  const [endDate, setEndDate] = useState(currentDateV2);

  // for pie
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);

  const numbers = [];
  const codes = [];

  const [trayekData, setTrayekData] = useState([]);
  // const [fTrayekData, setFTrayekData] = useState([]);
  const [absenData, setAbsenData] = useState([]);

  //for line
  const [sData, setSData] = useState([]);
  const [trayekDates, setTrayekDates] = useState([]);

  const dates = [];
  const temp = [];

  const [transaksiData, setTransaksiData] = useState([]);

  const resetData = async () => {
    window.location.reload();
  };

  // const [page, setPage] = useState(1);
  // const [start, setStart] = useState(0);
  // const [sortColumn, setSortColumn] = useState(0);
  // const [dir, setDir] = useState("desc");
  // const countPerPage = 10;
  // const [filterLog, setFilterLog] = useState("");

  // var bodyFormData = new FormData();

  // bodyFormData.append("draw", page);
  // bodyFormData.append("length", countPerPage);
  // bodyFormData.append("order[0][column]", sortColumn);
  // bodyFormData.append("order[0][dir]", dir);
  // bodyFormData.append("start", start);
  // bodyFormData.append("search[value]", filterLog);
  // // bodyFormData.append("columns[0][search][value]", "");
  // bodyFormData.append("start_date", startDate);
  // bodyFormData.append("end_date", endDate);

  const getAbsenData = async () => {
    const temp = [];

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .get(`/1.0.0/shifts?start_date=${startDate}&end_date=${endDate}`)
        .then((response) => {
          processStatusData(response.data);
        });
    } catch (error) {
      console.log(error);
      // setIsLoading(false)
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

  const processStatusData = (data) => {
    const statusCount = data.reduce((acc, item) => {
      let status = item.remark;
      if (status === null || status === "") {
        status = "Alpha";
      }
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});

    const statusArray = Object.keys(statusCount).map((status) => ({
      name: status,
      value: statusCount[status],
    }));

    setAbsenData(statusArray);
    // console.log(statusArray);
  };

  const combineData = (data) => {
    const combinedData = {};
    const dates = new Set(); // Use a Set to automatically handle unique dates

    data.forEach((item) => {
      const formattedDate = moment(item.tanggal).format("YYYY-MM-DD");
      dates.add(formattedDate); // Add each formatted date to the Set

      const key = `${formattedDate}-${item.trayek}`;

      // If this date and trayek combination doesn't exist yet, initialize it
      if (!combinedData[key]) {
        combinedData[key] = {
          tanggal: formattedDate,
          trayek: item.trayek,
          total_transaksi: 0,
          total_pendapatan: 0,
          transaksi: [],
          pendapatan: [],
        };
      }

      // Accumulate total_transaksi and total_pendapatan
      combinedData[key].total_transaksi += item.total_transaksi;
      combinedData[key].total_pendapatan += item.total_pendapatan;

      // Merge transaksi and pendapatan arrays
      combinedData[key].transaksi = [
        ...combinedData[key].transaksi,
        ...item.transaksi,
      ];
      combinedData[key].pendapatan = [
        ...combinedData[key].pendapatan,
        ...item.pendapatan,
      ];
    });

    // Convert the combined data object back into an array and extract unique dates as an array
    return {
      combinedDataArray: Object.values(combinedData),
      uniqueDates: Array.from(dates),
    };
  };

  // Update getData function
  const getData = async () => {
    const tempData = [];

    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta
        .get(`/trayek/table?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
          const { combinedDataArray, uniqueDates } = combineData(res.data.data);

          const tanggalSaved = {};
          const hasil = {}; // For total_pendapatan
          const trak = {}; // For total_transaksi

          combinedDataArray.forEach((data) => {
            if (!hasil[data.trayek]) {
              hasil[data.trayek] = {};
            }
            if (!trak[data.trayek]) {
              trak[data.trayek] = {};
            }

            tanggalSaved[data.tanggal] = true;
            hasil[data.trayek][data.tanggal] = data.total_pendapatan;
            trak[data.trayek][data.tanggal] = data.total_transaksi;
          });

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
          const tempTransaksiData = [];

          keys.forEach((key) => {
            temp.push({ name: key, data: hasil[key] }); // Existing pendapatan line
            tempTransaksiData.push({ name: key, data: trak[key] }); // New transaksi line
          });

          setSData(temp); // Set pendapatan data
          setTransaksiData(tempTransaksiData); // Set transaksi data

          const pieData = keys.map((key) => {
            const sumTransaksi = trak[key].reduce((acc, val) => acc + val, 0);
            return { name: key, value: sumTransaksi };
          });

          setTrayekData(pieData);
          setTrayekCodes(keys);
          setTrayekNumbers(pieData.map((d) => d.value));
        });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      localStorage.removeItem("delamenta-token");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data Reader tidak ada",
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }
  };

  // Update getDataByRange function
  const getDataByRange = async () => {
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta
        .get(`/trayek/table?startDate=${startDate}&endDate=${endDate}`)
        .then((res) => {
          const { combinedDataArray, uniqueDates } = combineData(res.data.data);
          const tanggalSaved = {};
          const hasil = {}; // For total_pendapatan
          const trak = {}; // For total_transaksi

          combinedDataArray.forEach((data) => {
            if (!hasil[data.trayek]) {
              hasil[data.trayek] = {};
            }
            if (!trak[data.trayek]) {
              trak[data.trayek] = {};
            }

            tanggalSaved[data.tanggal] = true;
            hasil[data.trayek][data.tanggal] = data.total_pendapatan;
            trak[data.trayek][data.tanggal] = data.total_transaksi;
          });

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
          const tempTransaksiData = [];

          keys.forEach((key) => {
            temp.push({ name: key, data: hasil[key] }); // Existing pendapatan line
            tempTransaksiData.push({ name: key, data: trak[key] }); // New transaksi line
          });

          setSData(temp); // Set pendapatan data
          setTransaksiData(tempTransaksiData); // Set transaksi data

          const pieData = keys.map((key) => {
            const sumTransaksi = trak[key].reduce((acc, val) => acc + val, 0);
            return { name: key, value: sumTransaksi };
          });

          setTrayekData(pieData);
          setTrayekCodes(keys);
          setTrayekNumbers(pieData.map((d) => d.value));
          Swal.fire({
            icon: "success",
            title: "Load Data Dashboard",
            text: "Berhasil load data!",
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
    getAbsenData();
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
              defaultValue={[dayjs(startofMonth), dayjs(currentDateV2)]}
              allowClear={false}
            />
            <span> </span>
            <button
              className="btn btn-success btn-sm shadow rounded"
              onClick={() => {
                getDataByRange();
                getAbsenData();
              }}
            >
              Set
            </button>
            <span> </span>
            <button
              className="btn btn-danger btn-sm shadow rounded"
              onClick={resetData}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="d-lg-flex flex-row mb-5 gap-5">
        <TestChart
          // trayekCodes={trayekCodes}
          // trayekNumbers={trayekNumbers}
          trayekData={trayekData}
        />

        <AbsenPie absenData={absenData} />
      </div>

      <PendapatanGraph trayekDates={trayekDates} sData={transaksiData} />

      {/* <KaryawanTable /> */}

      {/* <h1 className="mt-5">List Kendaraan</h1>
      <hr />

      <VehicleList />

      <br />

      <Carousel /> */}
    </div>
  );
}

export default Dashboard;
