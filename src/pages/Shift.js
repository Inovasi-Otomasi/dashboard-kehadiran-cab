import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import AddShift from "../components/AddShift";

const GET_URL = "/1.0.0/shifts"

function Shift() {

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
    const [shifts, setShifts] = useState([]);
    const [filterShifts, setFilterShifts] = useState([]);

  const columns = [
    { name: "Nomor ID", selector: (row) => row[0] , sortable: true},
    { name: "Nomor Shift", selector: (row) => row[1], sortable: true },
    { name: "Nama Shift", selector: (row) => row[2], sortable: true },
    { name: "Waktu Mulai", selector: (row) => row[3], sortable: true },
    { name: "Waktu Selesai", selector: (row) => row[4], sortable: true },
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
          url: "/1.0.0/shifts_datatables",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          setShifts(response.data.data);
          setFilterShifts(response.data.data);
          console.log(response.data.data)
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
      }
  }

  const deleteData = async (id) => {
    try{
        await axios.delete(`/1.0.0/shifts/${id}`).then((response) => {
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
    const newShifts = filterShifts.filter((row) =>
      row[2].toLowerCase().includes(e.target.value.toLowerCase())
    );
    setShifts(newShifts);
  };

  const renderTable = (
    <div className="my-4">
        <div>
            <input type="text" placeholder="Search" onChange={handleFilter} />
         </div>
         <DataTable
                columns={columns}
                data={shifts}
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


  return <div className="p-4">
    <AddShift />
     {isLoading ? <Spinner /> : renderTable}
  </div>;
}

export default Shift;
