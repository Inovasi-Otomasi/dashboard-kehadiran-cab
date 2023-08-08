import React from 'react'
import TrayekPie from '../components/TrayekPie'
import AbsenPie from '../components/AbsenPie'
import PendapatanGraph from '../components/PendapatanGraph'
import KaryawanTable from '../components/KaryawanTable'
import DateRange from '../components/DateRange'

function Dashboard() {
  return (
    <div className='dashboard-wrapper p-4'>
        <div className='d-md-flex flex-row justify-content-around'>
          <h1>Dashboard</h1>
        </div>
        <DateRange/>
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