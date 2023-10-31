import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const token = localStorage.getItem("delamenta-token");

function PendapatanGraph() {
  const reset = () => {
    window.location.reload(true);
  };

  const [sData, setSData] = useState([]);
  const [trayekDates, setTrayekDates] = useState([]);

  const data = [];
  const dates = [];

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(
        "http://38.47.76.208:3007/api/trayek/table?startDate=2023-09-01&endDate=2023-10-30"
      )
      .then((response) => {
        const newArr = [];
        const test = response.data.data;
        test.map((item) => {
          // test.forEach((element) => {
          // });
          // console.log(newArr);
          // data.push({ name: item.trayek, data: newArr });
        });
        test.map((item) => {
          if (!dates.includes(item.tanggal)) {
            dates.push(item.tanggal);
          }
          newArr.push(item.total_pendapatan);
        });
        console.log(newArr);
        setSData(data);
        setTrayekDates(dates);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(sData);
  // const [state, setState] = useState({
  //   options: {
  //     chart: {
  //       height: 350,
  //       type: "line",
  //       dropShadow: {
  //         enabled: false,
  //         color: "#000",
  //         top: 18,
  //         left: 7,
  //         blur: 10,
  //         opacity: 0.2,
  //       },
  //       toolbar: {
  //         show: true,
  //       },
  //     },
  //     colors: ["#77B6EA", "#545454", "#72ab65", "#862e4a"],
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     stroke: {
  //       curve: "straight",
  //     },
  //     title: {
  //       text: "Pendapatan Trayek CAB",
  //       align: "left",
  //     },
  //     grid: {
  //       borderColor: "#e7e7e7",
  //       row: {
  //         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //         opacity: 0.5,
  //       },
  //     },
  //     markers: {
  //       size: 1,
  //     },
  //     xaxis: {
  //       categories: trayekDates,
  //       title: {
  //         text: "Date",
  //       },
  //     },
  //     yaxis: {
  //       title: {
  //         text: "Penghasilan (Dalam Jutaan Rupiah)",
  //       },
  //       min: 0,
  //       max: 60,
  //     },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "right",
  //       floating: true,
  //       offsetY: -25,
  //       offsetX: -5,
  //     },
  //   },
  // });

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Chart
            options={{
              title: { text: "Pendapatan Trayek CAB" },
              xaxis: {
                title: { text: "Product Sell in Months" },
                categories: trayekDates,
              },
              yaxis: {
                title: { text: "Product in K" },
              },
            }}
            series={sData}
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
