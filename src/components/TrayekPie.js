import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

function TrayekPie() {
  const [trayekNumbers, setTrayekNumbers] = useState([]);
  const [trayekCodes, setTrayekCodes] = useState([]);
  const [trayekData, setTrayekData] = useState([]);

  useEffect(() => {
    const test = [
      {
        tanggal: "2023-10-23T17:00:00.000Z",
        id_trayek: "02",
        unit: "B350K",
        total_transaksi: 4,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "4",
          },
        ],
        total_pendapatan: 8,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "8",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-24T17:00:00.000Z",
        id_trayek: "02",
        unit: "B350K",
        total_transaksi: 36,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "36",
          },
        ],
        total_pendapatan: 72,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "72",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "02",
        unit: "B1005PCD",
        total_transaksi: 6,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "6",
          },
        ],
        total_pendapatan: 12,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "12",
          },
        ],
        trayek: "Jakarta - Tanggerang",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "03",
        unit: "H4JI",
        total_transaksi: 7,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "7",
          },
        ],
        total_pendapatan: 14,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "14",
          },
        ],
        trayek: "Cikini - Gondangdia",
      },
      {
        tanggal: "2023-10-26T17:00:00.000Z",
        id_trayek: "01",
        unit: "B1SA",
        total_transaksi: 8,
        transaksi: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            transaksi: "8",
          },
        ],
        total_pendapatan: 16,
        pendapatan: [
          {
            id_bank: 4,
            bank: "MANDIRI",
            pendapatan: "16",
          },
        ],
        trayek: "Jakarta - Bogor",
      },
    ];

    const tanggalSaved = {};
    const hasil = {};

    for (const data of test) {
      if (!hasil.hasOwnProperty(data.trayek)) {
        hasil[data.trayek] = {};
      }

      const tanggal = data.tanggal;
      tanggalSaved[tanggal] = true;
      hasil[data.trayek][tanggal] = data.total_pendapatan;
    }

    const tanggalArr = Object.keys(tanggalSaved);

    for (const trayek in hasil) {
      hasil[trayek] = tanggalArr.map((tanggal) => hasil[trayek][tanggal] ?? 0);
    }

    console.log(hasil);

    const keys = Object.keys(hasil);

    console.log(keys);

    keys.forEach((key, index) => {
      trayekData.push({ name: key, value: hasil[key] });
    });

    console.log(trayekData);

    trayekData.forEach((obj) => {
      const sum = obj.value.reduce((acc, curr) => acc + curr, 0);
      obj.value = sum;
    });

    console.log(trayekData);

    trayekData.forEach((obj) => {
      trayekCodes.push(obj.name);
      // trayekNumbers.push(obj.data);
    });

    console.log(trayekCodes);
    // console.log(trayekNumbers);
  }, [trayekCodes]);

  return (
    <div className="card">
      <div className="card-body">
        <ReactECharts
          option={{
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: 10,
              data: trayekCodes,
            },
            series: [
              {
                name: "Utilization",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: trayekData,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default TrayekPie;
