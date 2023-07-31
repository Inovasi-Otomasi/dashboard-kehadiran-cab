import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function Shift() {
  const columns = [
    { name: "Nomor ID", selector: (row) => row.id },
    { name: "Nama Shitft", selector: (row) => row.nama_shift },
    { name: "Waktu Mulai", selector: (row) => row.waktu_mulai },
    { name: "Waktu Selesai", selector: (row) => row.waktu_selesai },
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
        <button className="btn btn-danger btn-sm">
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      nama_shift: "Shift Trayek A",
      waktu_mulai: "08:00:00",
      waktu_selesai: "17:00:00",
    },
    {
      id: 2,
      nama_shift: "Shift Trayek B",
      waktu_mulai: "12:00:00",
      waktu_selesai: "23:00:00",
    },
    {
      id: 3,
      nama_shift: "Shift Trayek C",
      waktu_mulai: "18:00:00",
      waktu_selesai: "05:00:00",
    },
  ];

  return <div className="p-4">
     <DataTable columns={columns} data={data} pagination />
  </div>;
}

export default Shift;
