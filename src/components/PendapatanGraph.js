import React from "react";
import Chart from "react-apexcharts";

function PendapatanGraph({ sData, trayekDates }) {
  // const reset = () => {
  //   window.location.reload(true);
  // };

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
      {/* <button className="btn btn-danger mt-4" onClick={reset}>
        Reset
      </button> */}
    </>
  );
}

export default PendapatanGraph;
