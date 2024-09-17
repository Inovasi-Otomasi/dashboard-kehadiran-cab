import React from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
// import Chart from "react-apexcharts";

function AbsenPie({ absenData }) {
  var colorArray = ["#001852", "#e01f54", "#f5e8c8", "#000000", "#454B1B"];

  const option = {
    title: {
      text: "Absensi Driver",
      subtext: "Delameta Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      bottom: "left",
    },
    color: colorArray,
    series: [
      {
        name: "Jumlah Data",
        type: "pie",
        radius: "50%",
        data: absenData,
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

  return (
    <div className="card w-100">
      <div
        class="card-header"
        style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}
      ></div>

      <div className="card-body">
        <EChartsReact
          option={option}
          style={{ height: "500px", width: "100%" }}
        />
      </div>
    </div>
  );
}

export default AbsenPie;
