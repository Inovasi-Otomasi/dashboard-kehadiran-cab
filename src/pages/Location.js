import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "../api/axios";
// import Spinner from "../components/Spinner";
import AddRoute from "../components/AddRoute";
import ExportExcel from "../components/ExcelExport";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const GET_URL = "/1.0.0/routes_datatables";

function Location() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 10;

  // const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filterLocations, setFilterLocations] = useState("");
  const [routesExcel, setRoutesExcel] = useState([]);

  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", sortColumn);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterLocations);
  bodyFormData.append("columns[0][search][value]", "");

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true },
    { name: "Nomor", selector: (row) => row[1], sortable: true },
    { name: "Kode", selector: (row) => row[2], sortable: true },
    { name: "Awal", selector: (row) => row[3], sortable: true },
    { name: "Akhir", selector: (row) => row[4], sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/location/edit/${row[0]}`)}
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

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        setLocations(response.data);
      });
    } catch (error) {
      console.log(error);
      // setIsLoading(false)
    }
  };

  const getExcel = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios.get("/1.0.0/routes").then((response) => {
        setRoutesExcel(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Swal.fire({
      title: "Penghapusan Data Rute",
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus Data!",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          axios.delete(`/1.0.0/routes/${id}`).then((response) => {
            Swal.fire("Terhapus!", "Data telah dihapus.", "success");
            console.log(response);
            getData();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Penghapusan Data Rute",
          icon: "error",
          text: "Gagal menghapus data",
        });
      }
    });
  };

  const handleFilter = (e) => {
    setPage(1);
    setStart(0);
    setFilterLocations(e.target.value);

    // console.log(e.target.value)
    // console.log(filterLocations)
  };

  const handleChangePage = (page) => {
    setPage(page);
    setStart(countPerPage * page - countPerPage);
  };

  const handleSort = async (column, sortDirection) => {
    setSortColumn(column.id - 1);
    setDir(sortDirection);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (!isLoaded) {
      getData();
      getExcel();

      setIsLoaded(true);
    }
  }, [page, filterLocations, start, dir, sortColumn]);

  const renderTable = (
    <div className="my-4">
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleFilter}
          value={filterLocations}
          className="form-control mb-3"
        />
      </div>
      <div className="card bg-light">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={locations.data}
            pagination
            highlightOnHover
            paginationServer
            fixedHeader
            fixedHeaderScrollHeight="300px"
            paginationTotalRows={locations.recordsFiltered}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
            onSort={handleSort}
            sortServer
            onChangePage={handleChangePage}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <Helmet>
        <title>Data Absensi CAB | Trayek</title>
      </Helmet>
      <h1>Data Trayek CAB</h1>
      <hr />
      <div className="d-flex flex-row justify-content-between pb-4">
        <AddRoute />
        <ExportExcel
          excelData={routesExcel}
          fileName={"Laporan Data Rute Trayek"}
        />
      </div>
      {renderTable}
    </div>
  );
}

export default Location;
