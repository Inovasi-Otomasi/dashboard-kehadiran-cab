import React from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
import Chart from "react-apexcharts";

function AbsenPie() {
  var colorArray = ["#001852", "#e01f54", "#f5e8c8"];

  const option = {
    title: {
      text: "Absensi Driver",
      subtext: "Fake Data",
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
        data: [
          { value: 120, name: "Masuk" },
          { value: 30, name: "Alpha" },
          { value: 5, name: "Cuti" },
        ],
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
    <div className="card">
      <div
        class="card-header"
        style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}></div>

      <div className="card-body">
        {/* <Chart
          options={{
            width: "100%",
            title: {
              text: "Absensi Driver",
            },
            labels: ["Masuk", "Alpha", "Cuti"],
            noData: { text: "Loading Data..." },
          }}
          series={series}
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

export default AbsenPie;
