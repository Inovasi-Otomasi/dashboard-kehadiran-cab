import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import ExportExcel from "../components/ExcelExport";
import { DatePicker } from "antd";
import secureLocalStorage from "react-secure-storage";
import dayjs from "dayjs";
import moment from "moment";

const { RangePicker } = DatePicker;

const GET_URL = "/1.0.0/shifts_datatables";

function LogAbsen() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 10;

  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();

  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

  let startofMonth = `${currentYear}-${currentMonth}-01`;

  const [startDate, setStartDate] = useState(startofMonth);
  const [endDate, setEndDate] = useState(currentDate);

  const [logAbsen, setLogAbsen] = useState([]);
  const [filterLog, setFilterLog] = useState("");
  const [logsExcel, setLogsExcel] = useState([]);

  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", sortColumn);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterLog);
  // bodyFormData.append("columns[0][search][value]", "");
  bodyFormData.append("start_date", startDate);
  bodyFormData.append("end_date", endDate);

  function diff_hours(dt2, dt1) {
    // Calculate the difference in milliseconds between the two provided Date objects by subtracting the milliseconds value of dt1 from the milliseconds value of dt2
    var diff = (dt2 - dt1) / 1000;
    // Convert the difference from milliseconds to hours by dividing it by the number of seconds in an hour (3600)
    diff /= 60 * 60;
    console.log(diff);
    // Return the absolute value of the rounded difference in hours
    return `${Math.abs(Math.round(diff))} hours`;
  }

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true, wrap: true },
    { name: "Nama", selector: (row) => row[1], sortable: true, wrap: true },
    { name: "Tanggal", selector: (row) => row[2], sortable: true, wrap: true },
    { name: "Tap-In", selector: (row) => row[3], sortable: true, wrap: true },
    { name: "Tap-Out", selector: (row) => row[4], sortable: true, wrap: true },
    {
      name: "Jam Kerja",
      selector: (row) => {
        return moment
          .utc(moment(row[4], "HH:mm:ss").diff(moment(row[3], "HH:mm:ss")))
          .format("HH:mm:ss");
      },
      sortable: true,
      wrap: true,
    },
    { name: "Remark", selector: (row) => row[5], sortable: true, wrap: true },
    { name: "Notes", selector: (row) => row[6], sortable: true, wrap: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm shadow rounded"
          onClick={() => navigate(`/log-absen/edit/${row[0]}`)}
          id={row[0]}
        >
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
  ];

  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.id - 1);
    setDir(sortDirection);
  };

  const handleFilter = (e) => {
    setSortColumn(1);
    setPage(1);
    setStart(0);
    setFilterLog(e.target.value);
  };

  const getData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setLogAbsen(response.data);
        console.log(response.data);
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

  const resetData = async () => {
    window.location.reload();
  };

  const getDataByRange = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setLogAbsen(response.data);
        Swal.fire({
          icon: "success",
          title: "Load Data Log Absen",
          text: `Range dari ${startDate} hingga ${endDate} `,
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Load Data Log Absen",
        text: "Gagal mengload data",
      });
    }
  };

  const handleChangeDebut = (range) => {
    setStartDate(range[0].format("YYYY-MM-DD"));
    setEndDate(range[1].format("YYYY-MM-DD"));
  };

  const getExcel = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("/1.0.0/shifts").then((response) => {
        setLogsExcel(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getData();
    if (!isLoaded) {
      getExcel();

      setIsLoaded(true);
    }
  }, [page, filterLog, dir, sortColumn, start]);

  const renderTable = (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="form-control mb-3"
          onChange={handleFilter}
        />
      </div>

      <div className="card bg-light">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={logAbsen.data}
            pagination
            paginationServer
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="400px"
            paginationTotalRows={logAbsen.recordsFiltered}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            onSort={handleSort}
            sortServer
            onChangePage={(page) => {
              setPage(page);
              setStart(countPerPage * page - countPerPage);
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Data Absensi CAB | Log Absen</title>
      </Helmet>
      <label className="mb-3">CAB/Log Absen</label>

      <h1>Log Absensi Driver</h1>
      <hr />
      <div className="d-flex flex-row gap-4 my-4">
        <div>
          <RangePicker
            onChange={handleChangeDebut}
            defaultValue={[dayjs(startofMonth), dayjs(currentDate)]}
            allowClear={false}
          />
          <span> </span>
          <button
            className="btn btn-success btn-sm shadow rounded"
            onClick={getDataByRange}
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
        <button className="btn btn-primary shadow rounded">
          <i className="fa fa-refresh"></i> Sync
        </button>
        <ExportExcel excelData={logsExcel} fileName={"Laporan Log Absen"} />
      </div>

      {renderTable}
    </div>
  );
}

export default LogAbsen;
