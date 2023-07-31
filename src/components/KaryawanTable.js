import React, {useState} from "react";
import DataTable from "react-data-table-component";
import { Modal, Button, Col, Container, Row } from "react-bootstrap";

function KaryawanTable() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    { name: "Nomor ID", selector: (row) => row.id },
    { name: "Nama", selector: (row) => row.nama },
    { name: "Trayek", selector: (row) => row.trayek },
    { name: "Total Penghasilan", selector: (row) => row.penghasilan },
    {
      name: "Detail",
      cell: (row) => (
        <button onClick={handleShow} className="btn btn-primary btn-sm">
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
    },
    {
      id: 2,
      nama: "Jasun",
      trayek: "B",
      penghasilan: "Rp. 4000000",
    },
    {
      id: 3,
      nama: "Jafar",
      trayek: "C",
      penghasilan: "Rp. 5500000",
    },
  ];

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} pagination />
      {/* Modal Detail */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-2 text-center container-fluid">
            <Row className="py-1">
              <Col md={6}>
                <h3>Nama</h3>
                <h5>Joni</h5>
              </Col> 
              <Col md={6}>
                <h3>Trayek</h3>
                <h5>A</h5>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <h3>Penghasilan</h3>
                <h5>Rp. 5000000</h5>
              </Col>
              <Col md={6}>
                <h3>NIK</h3>
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
