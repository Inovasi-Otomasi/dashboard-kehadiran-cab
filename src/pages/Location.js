import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import AddRoute from "../components/AddRoute";

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

  const columns = [
    { name: "ID", selector: (row) => row[0]},
    { name: "Nomor", selector: (row) => row[1] },
    { name: "Kode", selector: (row) => row[2] },
    { name: "Titik Awal", selector: (row) => row[3] },
    { name: "Titik Akhir", selector: (row) => row[4] },
    { name: "Total pendapatan", selector: (row) => row[5] },
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
        <button className="btn btn-success btn-sm">
          <i className="fa fa-edit"></i>
        </button>
      ),
    },
    {
      name: "Hapus Data",
      cell: (row) => (
        <button className="btn btn-danger btn-sm" onClick={(e) => {if (window.confirm('Apakah anda yakin ingin menghapus data ini'))deleteData(row[0], e)}}
        id={row[0]}>
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
    try{
        await axios.delete(`/1.0.0/routes/${id}`).then((response) => {
            console.log(response)
            getData();
        })
    } catch (error){
        console.log(error)
    }
  }

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
            <input type="text" placeholder="Search" onChange={handleFilter} />
        </div>
        <DataTable
            columns={columns}
            data={locations}
            pagination
            highlightOnHover
            paginationServer
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
        <AddRoute />
      {isLoading ? <Spinner /> : renderTable}
    </div>
  );
}

export default Location;
