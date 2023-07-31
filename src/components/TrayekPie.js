import React from 'react'
import EChartsReact from 'echarts-for-react'
import * as echarts from 'echarts'
import { useState } from 'react';
import { Modal, Button, Col, Container, Row } from "react-bootstrap";


function TrayekPie() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onEvents = {
        click: handleShow
    }
    

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
    <>
        <EChartsReact 
            option={option}
            style={{height: 600, width: 700}}
            onEvents = {onEvents}
        />

        {/* Modal KODE CAB TRAYEK */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kode Trayek CAB</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='py-2 text-center'>
                    <Row className='py-1'>
                        <Col md={6}>
                            <Button variant='primary'>Trayek A</Button>
                        </Col>
                        <Col md={6}>
                            <Button variant='primary'>Trayek B</Button>
                        </Col>
                    </Row>
                    <Row className='py-1'>
                        <Col md={6}>
                            <Button variant='primary'>Trayek C</Button>
                        </Col>
                        <Col md={6}>
                            <Button variant='primary'>Trayek D</Button>
                        </Col>
                    </Row>
                    <Row className='py-1'>
                        <Col md={6}>
                            <Button variant='primary'>Trayek E</Button>
                        </Col>
                        <Col md={6}>
                            <Button variant='primary'>Trayek F</Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Tutup
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Detail Kode CAB Trayek */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detail CAB</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    
    
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