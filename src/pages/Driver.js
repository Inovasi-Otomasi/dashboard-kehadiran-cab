import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Driver() {
  const columns = [
    { name: "Nomor ID", selector: (row) => row.id },
    { name: "Nama", selector: (row) => row.nama },
    { name: "NIK", selector: (row) => row.nik },
    { name: "RFID", selector: (row) => row.rfid },
    { name: "Waktu Shift", selector: (row) => row.waktu_shift },
    { name: "Performansi Waktu Kerja", selector: (row) => row.performansi },
    { name: "Waktu Kerja", selector: (row) => row.waktu_kerja },
    { name: "Performansi Pendapatan", selector: (row) => row.pendapatan },
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
      nama: "Joni",
      nik: "32141241291",
      rfid: "RF123123",
      waktu_shift: "9 Jam",
      performansi: "A",
      waktu_kerja: "08:00:00",
      pendapatan: "Rp. 5000000",
    },
    {
      id: 1,
      nama: "Jasun",
      nik: "32141241123",
      rfid: "RF123456",
      waktu_shift: "12 Jam",
      performansi: "B",
      waktu_kerja: "00:00:00",
      pendapatan: "Rp. 4500000",
    },
    {
      id: 1,
      nama: "Bambang",
      nik: "32141241297",
      rfid: "RF123678",
      waktu_shift: "8 Jam",
      performansi: "C",
      waktu_kerja: "12:00:00",
      pendapatan: "Rp. 3000000",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}

export default Driver;
