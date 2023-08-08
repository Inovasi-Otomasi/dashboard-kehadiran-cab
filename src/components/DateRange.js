import React from 'react'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite-rtl.css'

function DateRange() {
  return (
    <div className='p-4'>
        <DateRangePicker format='yyyy-MM-dd HH:mm:ss' placeholder="Pilih range data" block />
    </div>
  )
}

export default DateRange