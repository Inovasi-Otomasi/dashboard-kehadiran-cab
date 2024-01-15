import React from "react";
import Chart from "react-apexcharts";

function PendapatanGraph({ sData, trayekDates }) {
  // const reset = () => {
  //   window.location.reload(true);
  // };

  return (
    <>
      <div className="card">
        <div
          class="card-header"
          style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
          <h5 className="fw-bold text-center">Pendapatan Trayek CAB</h5>
        </div>

        <div className="card-body">
          <Chart
            options={{
              xaxis: {
                title: { text: "Waktu" },
                categories: trayekDates,
              },
              yaxis: {
                title: { text: "Dalam Rupiah" },
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
              colors: ["#001852", "#e01f54", "#f5e8c8"],
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
