import React from "react";
import EChartsReact from "echarts-for-react";
import * as echarts from "echarts";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { Modal, Button, Col, Container, Row } from "react-bootstrap";
import TrayekMap from "./TrayekMap";
import delamenta from "../api/delamenta";

function TrayekPie() {
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [coordinates, setCoordinates] = useState([]);
  const [trayek, setTrayek] = useState([]);

  const [delamentaDt, setDelamentaDt] = useState([]);
  const [modalData, setModaldata] = useState({
    id: null,
    number: null,
    code: "",
    start_point: "",
    end_point: "",
  });

  const [showTrayek, setShowTrayek] = useState(false);

  const handleCloseTrayek = () => setShowTrayek(false);
  const handleShowTrayek = () => setShowTrayek(true);

  const onEvents = {
    click: handleShow,
  };

  const getCoordinates = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("1.0.0/routes/1").then((res) => {
        setCoordinates(JSON.parse(res.data.coordinates));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTrayek = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.get("1.0.0/routes/").then((res) => {
        setTrayek(res.data);
        console.log(res.data);
        console.log(trayek);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTrayekDelamenta = async () => {
    try {
      axios.defaults.headers.common["Authorization"] =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRlcjMwIiwiaWF0IjoxNjk2ODE4NTY5LCJleHAiOjE2OTc0MjMzNjl9.eaKyfOsqgAGYx4e0wW4nT_IYxupQWvT2BvUZrB4alzs";
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      await delamenta
        .get("/table?startDate=2023-09-01&endDate=2023-09-11")
        .then((res) => {
          setDelamentaDt(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const getTrayekbyId = async (id) => {
  //   try {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     await axios.get(`/1.0.0/routes/${id}`).then((res) => {
  //       setModaldata(res);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getCoordinates();
    getTrayek();
    getTrayekDelamenta();
  }, []);

  const option = {
    title: {
      text: "Performa Trayek",
      subtext: "Dalam Rp. X.000.000",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        restore: {},
      },
    },
    series: [
      {
        name: "Data",
        type: "pie",
        radius: "50%",
        data: [
          { value: 50, name: "Trayek A" },
          { value: 40, name: "Trayek B" },
          { value: 30, name: "Trayek C" },
          { value: 45, name: "Trayek D" },
          { value: 35, name: "Trayek E" },
          { value: 20, name: "Trayek F" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  console.log(delamentaDt);
  return (
    <>
      <EChartsReact
        option={option}
        style={{ height: 500, width: "100%" }}
        onEvents={onEvents}
      />

      {/* Modal KODE CAB TRAYEK */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kode Trayek CAB</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-2 text-center">
            <Row>
              {trayek.map((tryk) => (
                <Col md={6}>
                  <Button
                    variant="dark"
                    onClick={handleShowTrayek}
                    key={tryk.id}>
                    {tryk.code}
                  </Button>
                </Col>
              ))}
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
          <Container className="container-fluid py-2">
            <TrayekMap coordinates={coordinates} />
            <h3 className="text-md-center">Trayek A</h3>
            <Row className="py-1 text-center">
              <Col md={6}>
                <label>Awal Trayek</label>
                <h5>Depok</h5>
              </Col>
              <Col md={6}>
                <label>Akhir Trayek</label>
                <h5>FX Sudirman</h5>
              </Col>
            </Row>
            <Row className="py-1 text-center">
              <Col md={6}>
                <label>Pendapatan</label>
                <h5>Rp. 50.000.000</h5>
              </Col>
              <Col md={6}>
                <label>Performansi</label>
                <h5>Sangat Baik</h5>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTrayek}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrayekPie;
