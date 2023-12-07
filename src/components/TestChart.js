import React from "react";

import Chart from "react-apexcharts";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

function TestChart({ trayekCodes, trayekNumbers, trayekData }) {
  const option = {
    title: {
      text: "Performansi Trayek",
      subtext: "Delamenta Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      bottom: "left",
    },
    series: [
      {
        name: "Jumlah Transaksi",
        type: "pie",
        radius: "50%",
        data: trayekData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  console.log(trayekData);
  console.log(trayekCodes);
  console.log(trayekNumbers);

  return (
    <div className="card">
      <div className="card-body">
        {/* <Chart
          options={{
            width: "100%",
            type: "pie",
            title: {
              text: "Performansi Trayek",
            },
            noData: { text: "Loading Data..." },
            labels: trayekCodes,
          }}
          series={trayekNumbers}
          type="pie"
          width="100%"
          height="auto"
        /> */}
        <EChartsReact
          option={option}
          style={{ height: "500px", width: "100%" }}
        />
      </div>
    </div>
  );
}

export default TestChart;
