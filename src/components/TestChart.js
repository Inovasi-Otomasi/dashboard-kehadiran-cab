import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import delamenta from "../api/delamenta";

const token = localStorage.getItem("delamenta-token");

function TestChart({ trayekCodes, trayekNumbers }) {
  // const [trayekNumbers, setTrayekNumbers] = useState([]);
  // const [trayekCodes, setTrayekCodes] = useState([]);

  // const numbers = [];
  // const codes = [];

  // const [trayekData, setTrayekData] = useState([]);

  // const getData = async () => {
  //   delamenta.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   await delamenta
  //     .get("/trayek/table?startDate=2023-09-01&endDate=2023-11-17")
  //     .then((res) => {
  //       const tanggalSaved = {};
  //       const hasil = {};

  //       for (const data of res.data.data) {
  //         if (!hasil.hasOwnProperty(data.trayek)) {
  //           hasil[data.trayek] = {};
  //         }

  //         const tanggal = data.tanggal;
  //         tanggalSaved[tanggal] = true;
  //         hasil[data.trayek][tanggal] = data.total_pendapatan;
  //       }

  //       const tanggalArr = Object.keys(tanggalSaved);

  //       for (const trayek in hasil) {
  //         hasil[trayek] = tanggalArr.map(
  //           (tanggal) => hasil[trayek][tanggal] ?? 0
  //         );
  //       }

  //       const keys = Object.keys(hasil);

  //       keys.forEach((key, index) => {
  //         trayekData.push({ name: key, data: hasil[key] });
  //       });

  //       trayekData.forEach((obj) => {
  //         const sum = obj.data.reduce((acc, curr) => acc + curr, 0);
  //         obj.data = sum;
  //       });
  //       trayekData.forEach((obj) => {
  //         codes.push(obj.name);
  //         numbers.push(obj.data);
  //       });

  //       setTrayekCodes(codes);
  //       setTrayekNumbers(numbers);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="card" style={{ width: "100vw" }}>
      <div className="card-body">
        <Chart
          options={{
            width: "100%",
            type: "pie",
            title: {
              text: "Performansi Trayek",
            },
            noData: { text: "Loading Data..." },
            labels: trayekCodes,
            // responsive: [
            //   {
            //     breakpoint: 480,
            //     options: {
            //       chart: {
            //         width: 200,
            //       },
            //       legend: {
            //         position: "bottom",
            //       },
            //     },
            //   },
            // ],
            chart: {
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  console.log(config.w.config.labels[config.dataPointIndex]);
                  // navigate(
                  //   `/location/details/${
                  //     config.w.config.labels[config.dataPointIndex]
                  //   }`
                  // );
                },
              },
            },
          }}
          series={trayekNumbers}
          type="pie"
          width="100%"
          height="auto"
        />
      </div>
    </div>
  );
}

export default TestChart;
