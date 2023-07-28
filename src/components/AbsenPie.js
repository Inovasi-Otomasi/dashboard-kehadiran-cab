import React from 'react'
import EChartsReact from 'echarts-for-react'
import * as echarts from 'echarts'


function AbsenPie() {

    const option = {
        title: {
            text: 'Data Absen Shift',
            subtext: 'Absen Shift Juli 2023',
            left: 'center'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        toolbox: {
            show:true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: "Nightingale Chart",
                type: "pie",
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStye: {
                    borderRadius: 8
                },
                data: trayekData
            }
        ]
    }
  return (
    <EChartsReact 
        option={option}
        style={{height: 600, width: 700}}
    
    />
  )
}

const trayekData = [
    {value: 100, name: 'Shift 1'},
    {value: 70, name: 'Shift 2'},
    {value: 80, name: 'Shift 3'},
    {value: 50, name: 'Shift 4'},
]

export default AbsenPie;