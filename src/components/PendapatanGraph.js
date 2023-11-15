import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import delamenta from "../api/delamenta";

const token = localStorage.getItem("delamenta-token");

function PendapatanGraph({ sData, trayekDates }) {
  const reset = () => {
    window.location.reload(true);
  };

  // // const [sData, setSData] = useState([]);
  // // const [trayekDates, setTrayekDates] = useState([]);

  // // const dates = [];
  // // const temp = [];

  // // const getData = async () => {
  // //   delamenta.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // //   await delamenta
  // //     .get("/trayek/table?startDate=2023-09-01&endDate=2023-11-17")
  // //     .then((res) => {
  // //       res.data.data.forEach((item) => {
  // //         if (!dates.includes(item.tanggal.split("T")[0])) {
  // //           dates.push(item.tanggal.split("T")[0]);
  // //         }
  // //       });

  // //       const tanggalSaved = {};
  // //       const hasil = {};

  // //       for (const data of res.data.data) {
  // //         if (!hasil.hasOwnProperty(data.trayek)) {
  // //           hasil[data.trayek] = {};
  // //         }

  // //         const tanggal = data.tanggal;
  // //         tanggalSaved[tanggal] = true;
  // //         hasil[data.trayek][tanggal] = data.total_pendapatan;
  // //       }

  // //       const tanggalArr = Object.keys(tanggalSaved);
  // //       for (const trayek in hasil) {
  // //         hasil[trayek] = tanggalArr.map(
  // //           (tanggal) => hasil[trayek][tanggal] ?? 0
  // //         );
  // //       }

  // //       const keys = Object.keys(hasil);

  // //       keys.forEach((key, index) => {
  // //         temp.push({ name: key, data: hasil[key] });
  // //       });

  // //       setSData(temp);
  // //       setTrayekDates(dates);
  // //     });
  // // };

  // // useEffect(() => {
  // //   getData();
  // // }, []);

  // console.log(sData);
  // console.log(trayekDates);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Chart
            options={{
              title: { text: "Pendapatan Trayek CAB" },
              xaxis: {
                title: { text: "Waktu" },
                categories: trayekDates,
              },
              yaxis: {
                title: { text: "Dalam Jutaan Rupiah" },
              },
              legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
              },
              markers: {
                size: 1,
              },
              colors: ["#77B6EA", "#545454", "#72ab65", "#862e4a"],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: "straight",
              },
              grid: {
                borderColor: "#e7e7e7",
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
            }}
            series={sData}
            type="line"
            height={500}
          />
        </div>
      </div>
      <button className="btn btn-danger mt-4" onClick={reset}>
        Reset
      </button>
    </>
  );
}

export default PendapatanGraph;
