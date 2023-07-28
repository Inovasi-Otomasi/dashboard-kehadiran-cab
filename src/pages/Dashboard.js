import React from 'react'
import TrayekPie from '../components/TrayekPie'
import AbsenPie from '../components/AbsenPie'
import PendapatanGraph from '../components/PendapatanGraph'

function Dashboard() {
  return (
    <div className='dashboard-wrapper px-4'>
        <div className='d-flex flex-row'>
            <TrayekPie />
            <AbsenPie />
       
        </div>
        <div className='d-flex flex-row'>
            <PendapatanGraph />
        </div>
    </div>
    
  )
}

export default Dashboard