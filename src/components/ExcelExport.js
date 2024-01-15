import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import Swal from "sweetalert2";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedoument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".csv";

  const exportToExcel = async () => {
    Swal.fire({
      title: "Export Excel",
      text: "Mohon ditunggu, sebentar lagi file akan terdownload!",
      timer: 3000,
      timerProgressBar: true,
    });
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <button
        className="btn btn-success shadow rounded"
        onClick={(e) => exportToExcel(fileName)}>
        <i className="fa fa-file-excel"></i> Export
      </button>
    </>
  );
};

export default ExportExcel;
