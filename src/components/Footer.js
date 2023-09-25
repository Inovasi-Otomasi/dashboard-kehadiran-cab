import React from "react";

function Footer() {
  return (
    <footer className="footer pt-3">
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div class="col-6">
            <div class="copyright text-center text-sm text-muted text-lg-start">
              © 2023 PT Inovasi Otomasi Teknologi
            </div>
          </div>
          <div className="col-6">
            <ul className="nav nav-footer">
              <li className="nav-item text-end">Version : 20230925-CAB</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
