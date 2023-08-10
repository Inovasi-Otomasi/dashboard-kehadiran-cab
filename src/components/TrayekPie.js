import React from 'react'
import EChartsReact from 'echarts-for-react'
import * as echarts from 'echarts'
import { useState } from 'react';
import { Modal, Button, Col, Container, Row } from "react-bootstrap";
import TrayekMap from './TrayekMap';


function TrayekPie() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showTrayek, setShowTrayek] = useState(false);

    const handleCloseTrayek = () => setShowTrayek (false)
    const handleShowTrayek = () => setShowTrayek(true)

    const onEvents = {
        click: handleShow
    }
    

    const option = {
        title: {
            text: 'Data Performa Trayek',
            subtext: 'Dalam Rp. X.000.000',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          toolbox: {
            feature: {
                 saveAsImage: {},
                 restore: {}
             }
          },
          series: [
            {
              name: 'Data',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 50, name: 'Trayek A' },
                { value: 40, name: 'Trayek B' },
                { value: 30, name: 'Trayek C' },
                { value: 45, name: 'Trayek D' },
                { value: 35, name: 'Trayek E' },
                { value: 20, name: 'Trayek F' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
    }
  return (
    <>
        <EChartsReact 
            option={option}
            style={{height: 500, width: '100%'}}
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
                            <Button variant='primary' onClick={handleShowTrayek}>Trayek A</Button>
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

        {/* Modal Detail CAB */}
        <Modal show={showTrayek} onHide={handleCloseTrayek}>
            <Modal.Header closeButton>
                <Modal.Title>Detail Trayek A</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='container-fluid py-2'>
                    <TrayekMap />
                    <h1>Trayek A</h1>
                    <h3>Awal Trayek: Depok</h3>
                    <h3>Akhir Trayek: FX Sudirman</h3>
                    <h3>Pendapatan: Rp. 50000000</h3>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseTrayek}>
                Tutup
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    
    
  )
}

export default TrayekPie;