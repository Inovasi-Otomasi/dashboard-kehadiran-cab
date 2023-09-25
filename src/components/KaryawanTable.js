import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Modal, Button, Col, Container, Row } from "react-bootstrap";
import profile_pic from "../assets/profile.png";

function KaryawanTable() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customStyles = {
    columns: {
      style: {
        minWidth: "100px",
      },
    },
  };

  const columns = [
    { name: "Nomor ID", selector: (row) => row.id },
    { name: "Nama", selector: (row) => row.nama },
    { name: "Trayek", selector: (row) => row.trayek },
    { name: "Total Penghasilan", selector: (row) => row.penghasilan },
    { name: "Jam Operasional Kerja", selector: (row) => row.jam_operasional },
    { name: "Penggajian", selector: (row) => row.penggajian },
    {
      name: "Detail",
      cell: (row) => (
        <button onClick={handleShow} className="btn btn-success btn-sm">
          <i className="fa fa-search-plus"></i>
        </button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      nama: "Joni",
      trayek: "A",
      penghasilan: "Rp. 5000000",
      jam_operasional: "30 Hari",
      penggajian: "Rp.XXXXXXXX",
    },
  ];

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={data}
            pagination
            title="Detail Performa Driver"
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* Modal Detail */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-2 text-center container-fluid">
            <Col md={12}>
              <img src={profile_pic} width={"50%"} height={200} />
            </Col>
            <Row className="py-1">
              <Col md={6}>
                <label>Nama</label>
                <h5>Joni</h5>
              </Col>
              <Col md={6}>
                <label>Trayek</label>
                <h5>A</h5>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <label>Penghasilan</label>
                <h5>Rp. 5000000</h5>
              </Col>
              <Col md={6}>
                <label>NIK</label>
                <h5>32152214124100</h5>
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
    </div>
  );
}

export default KaryawanTable;
