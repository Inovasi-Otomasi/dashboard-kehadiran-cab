import React from "react";

import Chart from "react-apexcharts";

function TestChart({ trayekCodes, trayekNumbers }) {
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
            legend: {
              showForSingleSeries: true,
            },
            chart: {
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  console.log(config.w.config.labels[config.dataPointIndex]);
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
