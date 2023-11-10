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

  const dates = [];
  const trayek = [];

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios
    //   .get(
    //     "http://103.165.135.134:6005/api/trayek/table?startDate=2023-09-01&endDate=2023-10-30"
    //   )
    //   .then((response) => {
    //     // const newArr = [];
    //     const test = [
    //       {
    //         tanggal: "2023-10-23T17:00:00.000Z",
    //         id_trayek: "02",
    //         unit: "B350K",
    //         total_transaksi: 4,
    //         transaksi: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             transaksi: "4",
    //           },
    //         ],
    //         total_pendapatan: 8,
    //         pendapatan: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             pendapatan: "8",
    //           },
    //         ],
    //         trayek: "Jakarta - Tanggerang",
    //       },
    //       {
    //         tanggal: "2023-10-24T17:00:00.000Z",
    //         id_trayek: "02",
    //         unit: "B350K",
    //         total_transaksi: 36,
    //         transaksi: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             transaksi: "36",
    //           },
    //         ],
    //         total_pendapatan: 72,
    //         pendapatan: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             pendapatan: "72",
    //           },
    //         ],
    //         trayek: "Jakarta - Tanggerang",
    //       },
    //       {
    //         tanggal: "2023-10-26T17:00:00.000Z",
    //         id_trayek: "02",
    //         unit: "B1005PCD",
    //         total_transaksi: 6,
    //         transaksi: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             transaksi: "6",
    //           },
    //         ],
    //         total_pendapatan: 12,
    //         pendapatan: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             pendapatan: "12",
    //           },
    //         ],
    //         trayek: "Jakarta - Tanggerang",
    //       },
    //       {
    //         tanggal: "2023-10-26T17:00:00.000Z",
    //         id_trayek: "03",
    //         unit: "H4JI",
    //         total_transaksi: 7,
    //         transaksi: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             transaksi: "7",
    //           },
    //         ],
    //         total_pendapatan: 14,
    //         pendapatan: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             pendapatan: "14",
    //           },
    //         ],
    //         trayek: "Cikini - Gondangdia",
    //       },
    //       {
    //         tanggal: "2023-10-26T17:00:00.000Z",
    //         id_trayek: "01",
    //         unit: "B1SA",
    //         total_transaksi: 8,
    //         transaksi: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             transaksi: "8",
    //           },
    //         ],
    //         total_pendapatan: 16,
    //         pendapatan: [
    //           {
    //             id_bank: 4,
    //             bank: "MANDIRI",
    //             pendapatan: "16",
    //           },
    //         ],
    //         trayek: "Jakarta - Bogor",
    //       },
    //     ];
    //     console.log(test);

    //     test.forEach((item) => {
    //       if (!dates.includes(item.tanggal.split("T")[0])) {
    //         dates.push(item.tanggal.split("T")[0]);
    //       }
    //     });

    //     test.forEach((item) => {
    //       if (!trayek.includes(item.trayek)) {
    //         trayek.push(item.trayek);
    //       }
    //     });

    //     console.log(trayek);
    //     console.log(dates);

    //     for (var i = 1; i <= dates.length; i++) {
    //       pendapatan["total_pendapatan" + i] = [];
    //       for (var j = 1; j <= trayek.length; j++) {
    //         pendapatan[`total_pendapatan${i}`].push(0);
    //       }
    //     }

    //     console.log(pendapatan);

    //     test.forEach((item, i) => {
    //       pendapatan[`total_pendapatan${i + 1}`][i] = item.total_pendapatan;
    //     });

    //     // test.map((item) => {
    //     //   if (!dates.includes(item.tanggal.split("T")[0])) {
    //     //     dates.push(item.tanggal.split("T")[0]);
    //     //   }
    //     //   newArr.push({ name: item.trayek, data: [item.total_pendapatan] });
    //     // });
    //     // console.log(newArr);

    //     console.log(pendapatan);

    //     // setSData(pendapatan);
    //     setTrayekDates(dates);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
    console.log(test);

    test.forEach((item) => {
      if (!dates.includes(item.tanggal.split("T")[0])) {
        dates.push(item.tanggal.split("T")[0]);
      }
    });

    test.forEach((item) => {
      if (!trayek.includes(item.trayek)) {
        trayek.push(item.trayek);
      }
    });

    console.log(trayek);
    console.log(dates);

    // for (var i = 1; i <= dates.length; i++) {
    //   pendapatan["total_pendapatan" + i] = [];
    //   for (var j = 1; j <= trayek.length; j++) {
    //     pendapatan[`total_pendapatan${i}`].push(0);
    //   }
    // }

    // console.log(pendapatan);

    // test.forEach((item, i) => {
    //   pendapatan[`total_pendapatan${i + 1}`][i] = item.total_pendapatan;
    // });

    // console.log(pendapatan);

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

    console.log(sData);

    keys.forEach((key, index) => {
      sData.push({ name: key, data: hasil[key] });
    });

    // console.log(hasil["Cikini - Gondangdia"]);

    // setSData(pendapatan);
    setTrayekDates(dates);
  }, [sData]);

  console.log(sData);
  console.log(trayekDates);
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
                title: { text: "Waktu" },
                categories: trayekDates,
              },
              yaxis: {
                title: { text: "Dalam Jutaan Rupiah" },
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
              colors: ["#77B6EA", "#545454", "#72ab65", "#862e4a"],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: "straight",
              },
              grid: {
                borderColor: "#e7e7e7",
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
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
