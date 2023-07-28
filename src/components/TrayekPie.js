import React from 'react'
import EChartsReact from 'echarts-for-react'
import * as echarts from 'echarts'


function TrayekPie() {

    const option = {
        title: {
            text: 'Data Performa Trayek',
            subtext: 'Performa Trayek 2023',
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
    {value: 30, name: 'Trayek A'},
    {value: 35, name: 'Trayek B'},
    {value: 30, name: 'Trayek C'},
    {value: 20, name: 'Trayek D'},
    {value: 10, name: 'Trayek E'},
]

export default TrayekPie;