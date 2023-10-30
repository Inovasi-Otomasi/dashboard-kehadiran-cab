import React from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
import Chart from "react-apexcharts";

function AbsenPie() {
  const series = [120, 30, 5];

  return (
    <div className="card">
      <div className="card-body">
        <Chart
          options={{
            title: {
              text: "Absensi Driver",
            },
            labels: ["Masuk", "Alpha", "Cuti"],
            noData: { text: "Loading Data..." },
          }}
          series={series}
          type="pie"
          width={425}
          height="auto"
        />
      </div>
    </div>
  );
}

export default AbsenPie;
