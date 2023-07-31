import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Location() {
  const columns = [
    { name: "Nomor ID", selector: (row) => row.id },
    { name: "Nama Trayek", selector: (row) => row.trayek },
    { name: "Titik Awal Trayek", selector: (row) => row.lokasi_awal },
    { name: "Titik Akhir Trayek", selector: (row) => row.lokasi_akhir },
    { name: "Total Pendapatan Trayek", selector: (row) => row.pendapatan },
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
      trayek: "A",
      lokasi_awal: "Depok",
      lokasi_akhir: "Senopati",
      pendapatan: "Rp. 30000000",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}

export default Location;
