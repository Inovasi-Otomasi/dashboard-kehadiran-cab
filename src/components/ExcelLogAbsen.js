import React from "react";
import Swal from "sweetalert2";
import moment from "moment";

const ExcelJS = require("exceljs");

const ExcelLogAbsen = ({ data, startDate, endDate }) => {
  const exportToExcel = () => {
    Swal.fire({
      title: "Export Excel",
      text: "Mohon ditunggu, sebentar lagi file akan terdownload!",
      timer: 5000,
      timerProgressBar: true,
    });

    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Log Absensi");
      sheet.properties.defaultRowHeight = 25;
      sheet.properties.defaultColWidth = 25;

      const headerRow1 = sheet.addRow([
        "Nama",
        "Tanggal",
        "Tap In",
        "Tap Out",
        "Jam Kerja",
        "Remark",
        "Catatan",
      ]);

      headerRow1.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",

          // Yellow background color
        };
        cell.font = { bold: true }; // Bold font
        cell.alignment = { vertical: "middle", horizontal: "center" }; // Center align text vertically and horizontally
      });

      const columnMapping = {
        name: 1,
        date: 2,
        tap_in_time: 3,
        tap_out_time: 4,
        jam_kerja: 5, // New column for working hours
        remark: 6,
        notes: 7,
      };

      data.forEach((data, rowIndex) => {
        // Iterate over the keys of each object
        Object.keys(columnMapping).forEach((columnName) => {
          const columnIndex = columnMapping[columnName];
          let value = data[columnName]; // Get the value from the object's property
          // If column is 'jam_kerja', calculate the time difference
          if (columnName === "jam_kerja") {
            const tapInTime = data["tap_in_time"];
            const tapOutTime = data["tap_out_time"];

            if (tapInTime && tapOutTime) {
              value = moment
                .utc(
                  moment(tapOutTime, "HH:mm:ss").diff(
                    moment(tapInTime, "HH:mm:ss")
                  )
                )
                .format("HH:mm:ss");
            } else {
              value = ""; // Set empty if either time is missing
            }
          }
          sheet.getCell(rowIndex + 2, columnIndex).value = value; // Assuming you start from row 2
        });
      });

      const lastColumn = sheet.columns.length;
      const lastRow = sheet.rowCount;

      // Loop through each cell and apply borders
      for (let i = 1; i <= lastRow; i++) {
        for (let j = 1; j <= lastColumn; j++) {
          const cell = sheet.getCell(i, j);
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          cell.alignment = {
            horizontal: "center",
            wrapText: true,
          };
        }
      }
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `LogAbsensiCAB_${startDate}_To_${endDate}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Gagal Export!",
        icon: "error",
        text: error,
      });
    }
  };

  return (
    <>
      <button
        className="btn btn-success shadow rounded"
        onClick={exportToExcel}>
        <i className="fa fa-file-excel"></i> Export
      </button>
    </>
  );
};

export default ExcelLogAbsen;
