import React from 'react'
import DataTable from 'react-data-table-component'

function KaryawanTable() {

    const columns = [
        {name: "Nomor ID"},
        {name: "Nama"},
        {name: "Trayek"},
        {name: "Total Penghasilan"}
    ]

  return (
    <div className='p-4'>
        <DataTable columns={columns}
        pagination
    />
    </div>
  )
}

export default KaryawanTable