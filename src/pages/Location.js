import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import api from "../api/axios";
import delamenta from "../api/delamenta";
// import Spinner from "../components/Spinner";
import AddRoute from "../components/AddRoute";
import ExportExcel from "../components/ExcelExport";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import secureLocalStorage from "react-secure-storage";

const GET_URL = "/1.0.0/routes_datatables";

function Location() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dmtoken = localStorage.getItem("delamenta-token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 10;

  // const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const [locationsId, setLocationsId] = useState([]);
  const [dmDataId, setDmDataId] = useState([]);
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
    { name: "ID", selector: (row) => row[0], sortable: true, wrap: true },

    { name: "Kode", selector: (row) => row[2], sortable: true, wrap: true },
    { name: "Awal", selector: (row) => row[3], sortable: true, wrap: true },
    { name: "Akhir", selector: (row) => row[4], sortable: true, wrap: true },
    {
      name: "Detail",
      cell: (row) => (
        <button
          className="btn btn-success btn-sm shadow rounded"
          onClick={() => navigate(`/location/details/${row[0]}`)}
          id={row[0]}>
          <i className="fa fa-search-plus"></i>
        </button>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm shadow rounded"
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
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await api({
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

  const getDelamentaData = async (id) => {
    let temp = [];
    console.log(id);

    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta
        .get("http://103.165.135.134:6005/api/trayek/master")
        .then((response) => {
          temp = response.data.data.rows;
        });

      let objData = temp.find((o) => parseInt(o.id_trayek) === id);
      console.log(objData);

      const trayekData = {
        number: parseInt(objData.id_trayek),
        code: objData.deskripsi,
        complete_route: objData.trayek,
      };

      await api.post("/1.0.0/routes", trayekData);

      temp = [];
      Swal.fire({
        icon: "success",
        title: "Menambahkan Data Trayek",
        text: "Sukses menambahkan Trayek!",
      });
      getData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Menambahkan Data Trayek",
        text: "Gagal menambahkan Trayek!",
      });
    }
  };

  const handleSync = async () => {
    const tempDmId = [];
    const tempId = [];

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    Swal.fire({
      title: "Syncing",
      icon: "info",
      timer: 4000,
      timerProgressBar: true,
    });
    try {
      await delamenta
        .get("http://103.165.135.134:6005/api/trayek/master")
        .then((response) => {
          // setDmDataId(response.data.data.rows.trayek);
          response.data.data.rows.forEach((element) => {
            tempDmId.push(parseInt(element.id_trayek));
          });
          setDmDataId(tempDmId);
        });

      await api({
        method: "post",
        url: GET_URL,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        res.data.data.forEach((element) => {
          tempId.push(element[1]);
        });
        setLocationsId(tempId);
      });

      let uniqueDm = tempDmId.filter((o) => tempId.indexOf(o) === -1);
      let unique = tempId.filter((o) => tempDmId.indexOf(o) === -1);
      console.log(uniqueDm.concat(unique));

      const tempUnique = uniqueDm.concat(unique);

      tempUnique.forEach((id) => {
        getDelamentaData(id);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getExcel = async () => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await api.get("/1.0.0/routes").then((response) => {
        setRoutesExcel(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
          api.delete(`/1.0.0/routes/${id}`).then((response) => {
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
        localStorage.removeItem("token");
        secureLocalStorage.removeItem("role");
        localStorage.removeItem("delamenta-token");
        window.location.reload(true);
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
      // handleSync();

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
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Data Absensi CAB | Trayek</title>
      </Helmet>
      <label className="mb-3">CAB/Trayek</label>

      <h1>Trayek</h1>
      <hr />
      <div className="d-flex flex-row gap-4 pb-4">
        <AddRoute />
        <button className="btn btn-primary shadow rounded" onClick={handleSync}>
          <i className="fa fa-refresh"></i> Sync
        </button>
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
