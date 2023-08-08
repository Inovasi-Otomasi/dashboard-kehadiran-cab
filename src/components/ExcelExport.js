import React from "react";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const ExportExcel = ({excelData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedoument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.csv'

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = {Sheets: {'data' : ws}, SheetNames: ['data']}
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <>
            <button className="btn btn-success" onClick={(e) => exportToExcel(fileName)}>Export ke CSV</button>
        </>
    )
}

export default ExportExcel;