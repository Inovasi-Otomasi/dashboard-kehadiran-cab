import React from 'react'
import TrayekPie from '../components/TrayekPie'
import AbsenPie from '../components/AbsenPie'

function Dashboard() {
  return (
    <div className='d-flex flex-row'>
        <TrayekPie />
        <AbsenPie />
    </div>
  )
}

export default Dashboard