import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import api from "../api/axios";
import delamenta from "../api/delamenta";
// import Spinner from "../components/Spinner";
import AddDriver from "../components/AddDriver";
import ExportExcel from "../components/ExcelExport";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import secureLocalStorage from "react-secure-storage";

const GET_URL = "/1.0.0/drivers_datatables";

function Driver() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dmtoken = localStorage.getItem("delamenta-token");

  const [isLoaded, setIsLoaded] = useState(false);

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [sortColumn, setSortColumn] = useState(0);
  const [dir, setDir] = useState("desc");
  const countPerPage = 10;

  const [drivers, setDrivers] = useState([]);
  const [filterDrivers, setFilterDrivers] = useState("");
  const [driversExcel, setDriversExcel] = useState([]);

  var bodyFormData = new FormData();

  bodyFormData.append("draw", page);
  bodyFormData.append("length", countPerPage);
  bodyFormData.append("order[0][column]", sortColumn);
  bodyFormData.append("order[0][dir]", dir);
  bodyFormData.append("start", start);
  bodyFormData.append("search[value]", filterDrivers);
  bodyFormData.append("columns[0][search][value]", "");

  // const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true, wrap: true },
    { name: "Nomor", selector: (row) => row[1], sortable: true, wrap: true },
    { name: "Nama", selector: (row) => row[2], sortable: true, wrap: true },
    { name: "NIK", selector: (row) => row[3], sortable: true, wrap: true },
    { name: "SIM", selector: (row) => row[4], sortable: true, wrap: true },
    { name: "RFID", selector: (row) => row[5], sortable: true, wrap: true },
    { name: "Alamat", selector: (row) => row[6], sortable: true, wrap: true },
    {
      name: "Tanggal Masuk",
      selector: (row) => row[7],
      sortable: true,
      wrap: true,
    },
    { name: "Status", selector: (row) => row[8], sortable: true, wrap: true },
    {
      name: "Detail",
      cell: (row) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => navigate(`/driver/details/${row[0]}`)}>
          <i className="fa fa-search-plus"></i>
        </button>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/driver/edit/${row[0]}`)}
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
    setFilterDrivers(e.target.value);
    // console.log(e.target.value)
    // console.log(filterDrivers)
  };

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api({
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
        window.location.reload();
      }, 1000);
    }
  };

  const getDelamentaData = async (id) => {
    let temp = [];
    console.log(id);

    delamenta.defaults.headers.common["Authorization"] = `Bearer ${dmtoken}`;
    try {
      await delamenta.get("/driver?status=active").then((response) => {
        temp = response.data.data;
        console.log(response.data.data);
      });

      let objData = temp.find((o) => o.id_driver === id);
      console.log(objData);

      const driverData = {
        number: objData.id_driver,
        rfid: objData.nomor_kartu,
        name: objData.nama,
        status: "Aktif",
      };

      await api.post("/1.0.0/drivers", driverData);

      temp = [];
      Swal.fire({
        icon: "success",
        title: "Menambahkan Data Driver",
        text: "Sukses menambahkan Driver!",
      });
      getData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Menambahkan Data Driver",
        text: `Driver sudah ada atau tidak bisa ditambah! ${error}`,
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
      await delamenta.get("/driver?status=active").then((response) => {
        response.data.data.forEach((element) => {
          tempDmId.push(element.id_driver);
        });
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

        let uniqueDm = tempDmId.filter((o) => tempId.indexOf(o) === -1);
        let unique = tempId.filter((o) => tempDmId.indexOf(o) === -1);
        console.log(uniqueDm.concat(unique));

        const tempUnique = uniqueDm.concat(unique);

        console.log(tempId);
        console.log(tempDmId);
        console.log(tempUnique);

        tempUnique.forEach((id) => {
          getDelamentaData(id);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getExcel = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await api.get("/1.0.0/drivers").then((response) => {
        setDriversExcel(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await Swal.fire({
      title: "Penghapusan Data Driver",
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus Data!",
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          api.delete(`/1.0.0/drivers/${id}`).then((response) => {
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
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    getData();
    if (!isLoaded) {
      getExcel();

      setIsLoaded(true);
    }
  }, [page, filterDrivers, dir, sortColumn, start]);

  const renderTable = (
    <div className="">
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleFilter}
          className="form-control mb-3"
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
            fixedHeader
            fixedHeaderScrollHeight="400px"
            paginationTotalRows={drivers.recordsFiltered}
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
        <title>Data Absensi CAB | Driver</title>
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
      <div className="d-flex flex-row justify-content-between pb-4">
        {/* <ExportExcel excelData={logsExcel} fileName={"Laporan Log Absen"} /> */}
        <button className="btn btn-primary" onClick={handleSync}>
          Sync Delamenta
        </button>
      </div>
      {renderTable}
    </div>
  );
}

export default Driver;
