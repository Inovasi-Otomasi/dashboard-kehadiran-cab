import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "../api/axios";
// import Spinner from "../components/Spinner";
import AddShift from "../components/AddShift";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function Shift() {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);
  const [filterShifts, setFilterShifts] = useState("");
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");


  const [page, setPage] = useState(1);
  const countPerPage = 2;

  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]",0);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterShifts);
  bodyFormData.append("columns[0][search][value]", "");

 

  // const [isLoading, setIsLoading] = useState(false);
  

  // createTheme creates a new theme named solarized that overrides the build in dark theme
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
    { name: "Nomor ID", selector: (row) => row[0], sortable: true },
    { name: "Nomor Shift", selector: (row) => row[1], sortable: true },
    { name: "Nama Shift", selector: (row) => row[2], sortable: true },
    { name: "Waktu Mulai", selector: (row) => row[3], sortable: true },
    { name: "Waktu Selesai", selector: (row) => row[4], sortable: true },
    {
      name: "Edit Data",
      cell: (row) => (
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate(`/shift/edit/${row[0]}`)}
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
    setFilterShifts(e.target.value);
    console.log(e.target.value)
    console.log(filterShifts)
    getData();
  };

  const getData = async () => {
    try {
      await axios({
        method: "post",
        url: "/1.0.0/shifts_datatables",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setShifts(response.data);
    
        
      });
    } catch (error) {
      console.log(error)
    }
  };

  const deleteData = async (id) => {
    await Swal.fire({
      title: "Penghapusan Data Shift",
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus Data!",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          axios.delete(`/1.0.0/shifts/${id}`).then((response) => {
            Swal.fire("Terhapus!", "Data telah dihapus.", "success");
            console.log(response);
            getData();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Penghapusan Data Shift",
          icon: "error",
          text: "Gagal menghapus data",
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const renderTable = (
    <div className="my-4">
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
            data={shifts.data}
            pagination
            highlightOnHover
            paginationServer
            theme="solarized"
            fixedHeader
            fixedHeaderScrollHeight="300px"
            paginationTotalRows={shifts.recordsTotal}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            onSort={handleSort}
            sortServer
            onChangePage={(page) => {
              setPage(page);
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
        <title>Data Driver CAB | Shift</title>
      </Helmet>
      <h1>Data Shift CAB</h1>
      <hr />
      <AddShift />
      {renderTable}
    </div>
  );
}

export default Shift;
