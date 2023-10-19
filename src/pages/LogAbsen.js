import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import ExportExcel from "../components/ExcelExport";

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
  bodyFormData.append("columns[0][search][value]", "");

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true },
    { name: "Nama", selector: (row) => row[1], sortable: true },
    { name: "Tanggal", selector: (row) => row[2], sortable: true },
    { name: "Tap-In", selector: (row) => row[3], sortable: true },
    { name: "Tap-Out", selector: (row) => row[4], sortable: true },
    { name: "Remark", selector: (row) => row[5], sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/log-absen/edit/${row[0]}`)}
          id={row[0]}>
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
    }
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
    <div className="py-4">
      <Helmet>
        <title>Data Absensi CAB | Log Absen</title>
      </Helmet>
      <h1>Data Log Absen CAB</h1>
      <hr />
      <div className="d-flex flex-row justify-content-between pb-4">
        <ExportExcel excelData={logsExcel} fileName={"Laporan Log Absen"} />
      </div>
      {renderTable}
    </div>
  );
}

export default LogAbsen;
