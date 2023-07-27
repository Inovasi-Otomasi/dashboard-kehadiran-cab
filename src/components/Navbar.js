import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='dashboadrd-header mb-5'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top bg-dark border-bottom border-bottom-dark mb-2 px-2" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    CAB
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className='navbar-nav ml-auto navbar-right-top'>
                    <li class="nav-item">
                        <div id="custom-search" class="top-search-bar">
                            <input class="form-control" type="text" placeholder="Search.."/>
                        </div>
                    </li>
                    
                </ul>
            </div>
      </nav>
    </div>
  )
}

export default Navbar