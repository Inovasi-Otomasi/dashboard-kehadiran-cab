import React from 'react'
import TrayekPie from '../components/TrayekPie'
import AbsenPie from '../components/AbsenPie'
import PendapatanGraph from '../components/PendapatanGraph'
import KaryawanTable from '../components/KaryawanTable'

function Dashboard() {
  return (
    <div className='dashboard-wrapper p-4'>
        <h1>Dashboard</h1>
        <hr/>
        <div className='d-md-flex flex-row justify-content-around'>
            <TrayekPie />
            <AbsenPie />
        </div>
        <PendapatanGraph />
        <KaryawanTable />
    </div>
    
  )
}

export default Dashboard