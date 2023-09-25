import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100">
      <Helmet>
        <title>Data Absensi CAB | Page Not Found</title>
      </Helmet>
      <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3">
          {" "}
          <span class="text-danger">Oops!</span> Halaman tidak ditemukan.
        </p>
        <p class="lead">Halaman yang kau cari tidak ada.</p>
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Error;
