import React from 'react'
import TrayekPie from '../components/TrayekPie'
import AbsenPie from '../components/AbsenPie'
import PendapatanGraph from '../components/PendapatanGraph'
import KaryawanTable from '../components/KaryawanTable'

function Dashboard() {
  return (
    <div className='dashboard-wrapper p-4'>
        <div className='d-flex flex-row'>
            <TrayekPie />
            <AbsenPie />
       
        </div>
        <div className='d-flex flex-row'>
            <PendapatanGraph />
            <KaryawanTable />
        </div>
    </div>
    
  )
}

export default Dashboard