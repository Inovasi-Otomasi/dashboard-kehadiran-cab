import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import delamenta from "../api/delamenta";

const token = localStorage.getItem("delamenta-token");

function TestChart() {
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);
  const [trayekData, setTrayekData] = useState([]);

  useEffect(() => {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios
    //   .get(
    //     "http://103.165.135.134:6005/api/trayek/table?startDate=2023-09-01&endDate=2023-11-03"
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     response.data.data.map((item) => {
    //       numbers.push(item.total_pendapatan);
    //       codes.push(item.trayek);
    //     });
    //     setTrayekNumbers(numbers);
    //     setTrayekCodes(codes);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // axios
    //   .get("/1.0.0/routes")
    //   .then((response) => {
    //     console.log(response);
    //     response.data.map((item) => {
    //       numbers.push(item.number);
    //       codes.push(item.id);
    //     });
    //     setTrayekNumbers(numbers);
    //     setTrayekCodes(codes);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // getTrayekDelamenta();

    const test = [
      {
        tanggal: "2023-10-23T17:00:00.000Z",
        id_trayek: "02",
        unit: "B350K",
        total_transaksi: 4,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "4",
          },
        ],
        total_pendapatan: 8,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "8",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-24T17:00:00.000Z",
        id_trayek: "02",
        unit: "B350K",
        total_transaksi: 36,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "36",
          },
        ],
        total_pendapatan: 72,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "72",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "02",
        unit: "B1005PCD",
        total_transaksi: 6,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "6",
          },
        ],
        total_pendapatan: 12,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "12",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "03",
        unit: "H4JI",
        total_transaksi: 7,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "7",
          },
        ],
        total_pendapatan: 14,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "14",
          },
        ],
        trayek: "Cikini - Gondangdia",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "01",
        unit: "B1SA",
        total_transaksi: 8,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "8",
          },
        ],
        total_pendapatan: 16,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "16",
          },
        ],
        trayek: "Jakarta - Bogor",
      },
    ];

    const tanggalSaved = {};
    const hasil = {};

    for (const data of test) {
      if (!hasil.hasOwnProperty(data.trayek)) {
        hasil[data.trayek] = {};
      }

      const tanggal = data.tanggal;
      tanggalSaved[tanggal] = true;
      hasil[data.trayek][tanggal] = data.total_pendapatan;
    }

    const tanggalArr = Object.keys(tanggalSaved);

    for (const trayek in hasil) {
      hasil[trayek] = tanggalArr.map((tanggal) => hasil[trayek][tanggal] ?? 0);
    }

    console.log(hasil);

    const keys = Object.keys(hasil);

    console.log(keys);

    keys.forEach((key, index) => {
      trayekData.push({ name: key, data: hasil[key] });
    });

    trayekData.forEach((obj) => {
      const sum = obj.data.reduce((acc, curr) => acc + curr, 0);
      obj.data = sum;
    });

    console.log(trayekData);

    trayekData.forEach((obj) => {
      trayekCodes.push(obj.name);
      trayekNumbers.push(obj.data);
    });

    console.log(trayekCodes);
    console.log(trayekNumbers);
  }, [trayekCodes, trayekNumbers]);

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
