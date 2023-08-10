import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, {createTheme} from "react-data-table-component";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import AddRoute from "../components/AddRoute";
import Swal from "sweetalert2";

const GET_URL = "/1.0.0/routes_datatables"

function Location() {

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
    const [locations, setLocations] = useState([]);
    const [filterLocations, setFilterLocations] = useState([]);

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
    { name: "Nomor", selector: (row) => row[1], sortable: true },
    { name: "Kode", selector: (row) => row[2], sortable: true },
    { name: "Titik Awal", selector: (row) => row[3], sortable: true },
    { name: "Titik Akhir", selector: (row) => row[4], sortable: true },
    { name: "Total Pendapatan", selector: (row) => row[5], sortable: true },
    {
      name: "Edit Data",
      cell: (row) => (
        <button className="btn btn-light btn-sm"
          onClick={() => navigate(`/location/edit/${row[0]}`)}
          id={row[0]}
        >
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
    {
      name: "Hapus Data",
      cell: (row) => (
        <button className="btn btn-light btn-sm" onClick={() => deleteData(row[0])}>
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
          setLocations(response.data.data);
          setFilterLocations(response.data.data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
      }
  }

  const deleteData = async (id) => {
    await Swal.fire({
      title: "Penghapusan Data Rute",
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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

  useEffect(() => {
    getData();
  }, [page])

  const handleFilter = (e) => {
    const newLocations = filterLocations.filter((row) => 
    row[2].toLowerCase().includes(e.target.value.toLowerCase())
    )
    setLocations(newLocations)
  }

  const renderTable = (
    <div className="my-4">
        <div>
            <input type="text" placeholder="Search" onChange={handleFilter} className="mb-3"/>
        </div>
        <DataTable
            columns={columns}
            data={locations}
            pagination
            highlightOnHover
            paginationServer
            theme="solarized"
            fixedHeader
            fixedHeaderScrollHeight="300px"
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
      <h1>Data Rute CAB</h1>
      <hr />
      <AddRoute />
      {isLoading ? <Spinner /> : renderTable}
    </div>
  );
}

export default Location;
