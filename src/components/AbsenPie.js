import React from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";

function AbsenPie() {
  const option = {
    title: {
      text: "Performa Driver",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        restore: {},
      },
    },
    series: [
      {
        name: "Data",
        type: "pie",
        radius: "50%",
        data: [
          { value: 100, name: "Masuk" },

          { value: 5, name: "Alpha" },
          { value: 10, name: "Cuti" },
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
    <EChartsReact option={option} style={{ height: 500, width: "100%" }} />
  );
}

export default AbsenPie;
