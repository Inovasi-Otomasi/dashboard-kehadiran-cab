import React from 'react'
import EChartsReact from 'echarts-for-react'
import * as echarts from 'echarts'

function PendapatanGraph() {

    const option = {
        title: {
            text: 'Pendapatan Trayek'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Trayek A', 'Trayek B', 'Trayek C', 'Trayek D', 'Trayek E']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox:{
            feature: {
                saveAsImage: {}
            }
        },
        xAxis:{
            type: 'category',
            boundaryGap: false,
            data: ['Maret', 'April', 'Mei', 'Juni', 'Juli']
        },
        yAxis:{
            type: 'value'
        },
        series: [
            {
                name: 'Trayek A',
                type: 'line',
                // stack: 'x',
                data: [100, 150, 120, 140, 160]
            },
            {
                name: 'Trayek B',
                type: 'line',
                // stack: 'x',
                data: [90, 160, 110, 130, 120]
            },
            {
                name: 'Trayek C',
                type: 'line',
                // stack: 'x',
                data: [130, 120, 130, 150, 170]
            },
            {
                name: 'Trayek D',
                type: 'line',
                // stack: 'x',
                data: [70, 100, 140, 170, 140]
            },
            {
                name: 'Trayek E',
                type: 'line',
                // stack: 'x',
                data: [110, 140, 160, 120, 100]
            },
        ]
    }

  return (
    <EChartsReact 
        option={option}
        style={{height: 400, width: 900}}
    />
  )
}

export default PendapatanGraph