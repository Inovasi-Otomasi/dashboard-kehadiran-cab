import React, { useState } from "react";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <main className={show ? "space-toggle" : null}>
      {token ? (
        <header className={`header ${show ? "space-toggle" : null}`}>
          <div className="header-toggle" onClick={() => setShow(!show)}>
            <i className={`fa fa-bars ${show ? "fa fa-xmark" : null}`}></i>
          </div>
        </header>
      ) : null}

      {token ? (
        <aside className={`sidebar ${show ? "show_sidebar" : null}`}>
          <nav className="nav">
            <div>
              <img
                src={logo}
                width={60}
                height={40}
                className="nav-logo nav-start nav-logo-icon"
              />

              <div className="nav-list">
                <NavLink
                  to="/dashboard"
                  className="nav-link"
                  style={{ textDecoration: "none" }}>
                  <i className="fa-solid fa-chart-line nav-link-icon"></i>
                  <span
                    className="nav-link-name"
                    style={{ marginLeft: "1.3rem" }}>
                    Dashboard
                  </span>
                </NavLink>

                <NavLink
                  to="/log-absen"
                  className="nav-link"
                  style={{ textDecoration: "none" }}>
                  <i className="fa-solid fa-clock nav-link-icon"></i>
                  <span
                    className="nav-link-name"
                    style={{ marginLeft: "1.3rem" }}>
                    Log Absen
                  </span>
                </NavLink>
                <NavLink
                  to="/driver"
                  className="nav-link"
                  style={{ textDecoration: "none" }}>
                  <i className="fa-solid fa-users nav-link-icon"></i>
                  <span
                    className="nav-link-name"
                    style={{ marginLeft: "1.1rem" }}>
                    Drivers
                  </span>
                </NavLink>
                <NavLink
                  to="/location"
                  className="nav-link"
                  style={{ textDecoration: "none" }}>
                  <i className="fa-solid fa-map nav-link-icon"></i>
                  <span
                    className="nav-link-name"
                    style={{ marginLeft: "1.2rem" }}>
                    Routes
                  </span>
                </NavLink>
                <NavLink
                  to="/logout"
                  className="nav-link"
                  style={{ textDecoration: "none" }}>
                  <i className={`fas fa-power-off nav-link-icon`}></i>
                  <span
                    className="nav-link-name"
                    style={{ marginLeft: "1.3rem" }}>
                    Logout
                  </span>
                </NavLink>
              </div>
            </div>
          </nav>
        </aside>
      ) : null}
    </main>
  );
};

export default Sidebar;
