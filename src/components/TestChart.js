import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Chart from "react-apexcharts";
import delamenta from "../api/delamenta";

const token = localStorage.getItem("token");

function TestChart() {
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);

  const numbers = [];
  const codes = [];

  const navigate = useNavigate();

  const [delamentaDt, setDelamentaDt] = useState([]);

  // const getTrayekDelamenta = async () => {
  //   try {
  //     axios.defaults.headers.common["Authorization"] =
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRlcjMwIiwiaWF0IjoxNjk4Mzc5MjkzLCJleHAiOjE2OTg5ODQwOTN9.F9Qu4G6s8Kk4aSAkIBKTCiKx-9YndjAKKszAQ_sp3JA";
  //     axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  //     await delamenta.get("/kendaraan/master?page=1&limit=10").then((res) => {
  //       setDelamentaDt(res.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("/1.0.0/routes")
      .then((response) => {
        console.log(response);
        response.data.map((item) => {
          numbers.push(item.number);
          codes.push(item.id);
        });
        setTrayekNumbers(numbers);
        setTrayekCodes(codes);
      })
      .catch((e) => {
        console.log(e);
      });

    // getTrayekDelamenta();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <Chart
          options={{
            title: {
              text: "Performansi Trayek",
            },
            noData: { text: "Loading Data..." },
            labels: trayekCodes,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
            chart: {
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  // console.log(config.w.config.labels[config.dataPointIndex]);
                  navigate(
                    `/location/details/${
                      config.w.config.labels[config.dataPointIndex]
                    }`
                  );
                },
              },
            },
          }}
          series={trayekNumbers}
          type="pie"
          width={400}
          height="auto"
        />
      </div>
    </div>
  );
}

export default TestChart;
