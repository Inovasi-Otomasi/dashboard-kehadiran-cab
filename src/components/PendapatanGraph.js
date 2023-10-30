import React, { useState } from "react";
import Chart from "react-apexcharts";

function PendapatanGraph() {
  const reset = () => {
    window.location.reload(true);
  };

  const [state, setState] = useState({
    series: [
      {
        name: "Trayek DPK-001 - 2023",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Trayek DPK-002 - 2023",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
      {
        name: "Trayek DPK-003 - 2023",
        data: [38, 39, 43, 46, 42, 42, 43],
      },
      {
        name: "Trayek DPK-004 - 2023",
        data: [52, 31, 34, 38, 37, 33, 33],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: false,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: true,
        },
      },
      colors: ["#77B6EA", "#545454", "#72ab65", "#862e4a"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Pendapatan Trayek CAB",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Bulan",
        },
      },
      yaxis: {
        title: {
          text: "Penghasilan (Dalam Jutaan Rupiah)",
        },
        min: 0,
        max: 60,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Chart
            options={state.options}
            series={state.series}
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
