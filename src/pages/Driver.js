import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "../api/axios";
// import Spinner from "../components/Spinner";
import AddDriver from "../components/AddDriver";
import ExportExcel from "../components/ExcelExport";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const GET_URL = "/1.0.0/drivers_datatables";

function Driver() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [start,setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 2;

  const [drivers, setDrivers] = useState([]);
  const [filterDrivers, setFilterDrivers] = useState("");
  const [driversExcel, setDriversExcel] = useState([]);


  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", 0);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterDrivers);
  bodyFormData.append("columns[0][search][value]", "");
  

  

  // const [isLoading, setIsLoading] = useState(false);

  createTheme(
    "solarized",
    {
      text: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
      },
      background: {
        default: "#0A1929",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#FFFFFF",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true },
    { name: "Username", selector: (row) => row[14], sortable: true },
    // { name: "Nomor", selector: (row) => row[1], sortable: true},
    // { name: "Shift ID", selector: (row) => row[6], sortable: true},
    { name: "Shift", selector: (row) => row[2], sortable: true },
    // { name: "NIK", selector: (row) => row[3], sortable: true},
    // { name: "Nomor SIM", selector: (row) => row[4], sortable: true},
    // { name: "RFID", selector: (row) => row[5], sortable: true},
    // { name: "Mulai Shift", selector: (row) => row[7], sortable: true},
    // { name: "Akhir Shift", selector: (row) => row[8], sortable: true},
    // { name: "Alamat", selector: (row) => row[9], sortable: true},
    // { name: "Mulai Bekerja", selector: (row) => row[10], sortable: true},
    { name: "Jabatan", selector: (row) => row[11], sortable: true },
    { name: "Level Menu", selector: (row) => row[12], sortable: true },
    { name: "Status", selector: (row) => row[13], sortable: true },
    {
      name: "Detail",
      cell: (row) => (
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate(`/driver/details/${row[0]}`)}>
          <i className="fa fa-search-plus"></i>
        </button>
      ),
    },
    {
      name: "Edit Data",
      cell: (row) => (
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate(`/driver/edit/${row[0]}`)}
          id={row[0]}>
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
    {
      name: "Hapus Data",
      cell: (row) => (
        <button
          className="btn btn-light btn-sm"
          onClick={() => deleteData(row[0])}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];

  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.id - 1);
    setDir(sortDirection);
    getData();
  };

  const handleFilter = (e) => {
    setFilterDrivers(e.target.value);
    console.log(e.target.value)
    console.log(filterDrivers)
    getData();
  };

  const getData = async () => {
    try {
      // setIsLoading(true);
      await axios({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setDrivers(response.data);
        // setIsLoading(false);
      });
    } catch (error) {
      // setIsLoading(false);
      console.log(error)
    }
  };

  const getExcel = async () => {
    try {
      await axios.get("/1.0.0/drivers").then((response) => {
        setDriversExcel(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    await Swal.fire({
      title: "Penghapusan Data Driver",
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus Data!",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          axios.delete(`/1.0.0/drivers/${id}`).then((response) => {
            Swal.fire("Terhapus!", "Data telah dihapus.", "success");
            console.log(response);
            getData();
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Penghapusan Data Driver",
          icon: "error",
          text: error,
        });
      }
    });
  };

  useEffect(() => {
    getData();
    getExcel();
  }, [page]);


  const renderTable = (
    <div className="">
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleFilter}
          className="mb-3"
        />
      </div>

      <div className="card bg-light">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={drivers.data}
            pagination
            highlightOnHover
            paginationServer
            theme="solarized"
            fixedHeader
            fixedHeaderScrollHeight="400px"
            paginationTotalRows={drivers.recordsTotal}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            onSort={handleSort}
            sortServer
            onChangePage={(page) => {
              setPage(page)
              setStart(countPerPage * page - countPerPage)
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <Helmet>
        <title>Data Driver CAB | Driver</title>
      </Helmet>
      <h1>Data Driver CAB</h1>
      <hr />
      <div className="d-flex flex-row justify-content-between pb-4">
        <AddDriver />
        <ExportExcel
          excelData={driversExcel}
          fileName={"Laporan Data Driver"}
        />
      </div>
      {renderTable}
    </div>
  );
}

export default Driver;
