import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, {createTheme} from "react-data-table-component";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import AddDriver from "../components/AddDriver";
import ExportExcel from "../components/ExcelExport";
import Swal from "sweetalert2";

const GET_URL = "/1.0.0/drivers_datatables"

function Driver() {

    const navigate = useNavigate();

    var bodyFormData = new FormData();

    bodyFormData.append("draw", 1);
    bodyFormData.append("length", 10);
    bodyFormData.append("order[0][column]", 0);
    bodyFormData.append("order[0][dir]", "desc");
    bodyFormData.append("start", 0);
    bodyFormData.append("search[value]", "");
    bodyFormData.append("columns[0][search][value]", "");

    const [page, setPage] = useState(1);
    const countPerPage = 10;

    const [isLoading, setIsLoading] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [filterDrivers, setFilterDrivers] = useState([]);
    const [driversExcel, setDriversExcel] = useState([])

    createTheme('solarized', {
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
      },
      background: {
        default: '#0A1929',
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: '#FFFFFF',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    }, 'dark');

  const columns = [
    { name: "ID", selector: (row) => row[0], sortable: true},
    { name: "Username", selector: (row) => row[14], sortable: true},
    // { name: "Nomor", selector: (row) => row[1], sortable: true},
    // { name: "Shift ID", selector: (row) => row[6], sortable: true},
    { name: "Shift", selector: (row) => row[2], sortable: true},
    // { name: "NIK", selector: (row) => row[3], sortable: true},
    // { name: "Nomor SIM", selector: (row) => row[4], sortable: true},
    // { name: "RFID", selector: (row) => row[5], sortable: true},
    // { name: "Mulai Shift", selector: (row) => row[7], sortable: true},
    // { name: "Akhir Shift", selector: (row) => row[8], sortable: true},
    // { name: "Alamat", selector: (row) => row[9], sortable: true},
    // { name: "Mulai Bekerja", selector: (row) => row[10], sortable: true},
    { name: "Jabatan", selector: (row) => row[11], sortable: true},
    { name: "Level Menu", selector: (row) => row[12], sortable: true},
    { name: "Status", selector: (row) => row[13], sortable: true},
    {
      name: "Detail",
      cell: (row) => (
        <button className="btn btn-primary btn-sm">
          <i className="fa fa-search-plus"></i>
        </button>
      ),
    },
    {
      name: "Edit Data",
      cell: (row) => (
        <button className="btn btn-success btn-sm"
          onClick={() => navigate(`/driver/edit/${row[0]}`)}
          id={row[0]}>
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
    {
      name: "Hapus Data",
      cell: (row) => (
        <button className="btn btn-danger btn-sm" onClick={() => deleteData(row[0])}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];

  const getData = async() => {
    try {
        setIsLoading(true);
        await axios({
          method: "post",
          url: GET_URL,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          setDrivers(response.data.data);
          setFilterDrivers(response.data.data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
      }
  }

  const getExcel = async () => {
    try{
        await axios.get('/1.0.0/drivers').then((response) => {
            setDriversExcel(response.data);
        })
    } catch (error) {
        console.log(error)
    }
  }

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
        console.log(error)
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
  }, [page])

  const handleFilter = (e) => {
    const newDrivers = filterDrivers.filter((row) => 
    row[2].toLowerCase().includes(e.target.value.toLowerCase())
    )
    setDrivers(newDrivers)
  }

  const renderTable = (
    <div className="">
        <div>
            <input type="text" placeholder="Search" onChange={handleFilter} className="mb-3"/>
        </div>
        <DataTable
            columns={columns}
            data={drivers}
            pagination
            highlightOnHover
            paginationServer
            theme="solarized"
            fixedHeader
            fixedHeaderScrollHeight="400px"
            paginationTotalRows={countPerPage}
            paginationComponentOptions={{
            noRowsPerPage: true,
            }}
            onChangePage={(page) => setPage(page)}
        />
    </div>
  )

  return (
    <div className="p-4">
      <h1>Data Driver CAB</h1>
      <hr />
      <div className="d-flex flex-row justify-content-between pb-4">
        <AddDriver />
        <ExportExcel />
      </div>
      {isLoading ? <Spinner /> : renderTable}
      
    </div>
  );
}

export default Driver;
