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
  const token = localStorage.getItem("token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [shifts, setShifts] = useState([]);
  const [filterShifts, setFilterShifts] = useState("");
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");

  const [page, setPage] = useState(1);
  const countPerPage = 10;

  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", sortColumn);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterShifts);
  bodyFormData.append("columns[0][search][value]", "");

  // const [isLoading, setIsLoading] = useState(false);

  // createTheme creates a new theme named solarized that overrides the build in dark theme

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true },
    { name: "Nomor ", selector: (row) => row[1], sortable: true },
    { name: "Shift", selector: (row) => row[2], sortable: true },
    { name: "Mulai", selector: (row) => row[3], sortable: true },
    { name: "Selesai", selector: (row) => row[4], sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/shift/edit/${row[0]}`)}
          id={row[0]}>
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
    {
      name: "Hapus",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteData(row[0])}>
          <i className="fa fa-trash"></i>
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
    setFilterShifts(e.target.value);
  };

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (!isLoaded) {
      getData();

      setIsLoaded(true);
    }
  }, [page, start, dir, sortColumn, filterShifts]);

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
            fixedHeader
            fixedHeaderScrollHeight="300px"
            paginationTotalRows={shifts.recordsFiltered}
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
        <title>Data Absensi CAB | Shift</title>
      </Helmet>
      <h1>Data Shift CAB</h1>
      <hr />
      <AddShift />
      {renderTable}
    </div>
  );
}

export default Shift;
