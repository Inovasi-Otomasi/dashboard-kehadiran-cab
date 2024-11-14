import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

function PendapatanGraph({ sData, trayekDates }) {
  return (
    <>
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}
        >
          <h5 className="fw-bold text-center">Transaksi Harian Trayek CAB</h5>
        </div>

        <div className="card-body">
          <Chart
            options={{
              xaxis: {
                title: { text: "Waktu" },
                categories: trayekDates,
                type: "datetime", // Set x-axis type to datetime
                labels: {
                  format: "dd MMM", // Format date as "dd MMM" (e.g., "03 Nov")
                },
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
                  colors: ["#f3f3f3", "transparent"],
                  opacity: 0.5,
                },
              },
              tooltip: {
                x: {
                  formatter: (val) => moment(val).format("YYYY-MM-DD"), // Format tooltip date
                },
              },
            }}
            series={sData}
            type="line"
            height={500}
          />
        </div>
      </div>
    </>
  );
}

export default PendapatanGraph;
