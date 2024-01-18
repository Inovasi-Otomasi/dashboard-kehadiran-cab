import React, { useState, useEffect } from "react";
import api from "../api/axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";

const token = localStorage.getItem("token");

function VehicleList() {
  const [routes, setRoutes] = useState([]);

  const getVehiclesRow = (test) => {
    const temp2 = [];
    const temp = JSON.parse(test);
    temp.forEach((element) => {
      temp2.push(element.label);
    });
    return temp2.toString();
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Trayek",
      selector: (row) => `Trayek ${row.code}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Kendaraan",
      selector: (row) =>
        row.vehicles !== "null" || null
          ? getVehiclesRow(row.vehicles)
          : "0 Kendaraan",
      sortable: true,
      wrap: true,
    },
  ];

  const renderTable = (
    <div className="card mt-3" style={{ width: "91.7vw" }}>
      <div className="card-body">
        <DataTable
          columns={columns}
          data={routes}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/1.0.0/routes").then((res) => {
        setRoutes(res.data);
      });
    } catch (e) {
      console.log(e);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-row gap-5 align-content-start">
      {renderTable}
    </div>
  );
}

export default VehicleList;
