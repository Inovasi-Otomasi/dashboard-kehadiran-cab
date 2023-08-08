import React, {useState} from 'react';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [show, setShow] = useState(false);
  
    return (
      <main className={show ? 'space-toggle' : null}>
        <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fa-solid fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
          </div>
        </header>
  
        <aside className={`sidebar ${show ? 'show' : null}`}>
          <nav className='nav'>
            <div>
              <Link to='/' className='nav-logo'>
                <i className={`fas fa-home-alt nav-logo-icon`}></i>
                <span className='nav-logo-name'>Dashboard</span>
              </Link>
  
              <div className='nav-list'>
                <Link to='/shift' className='nav-link'>
                  <i className='fa-solid fa-clock nav-link-icon'></i>
                  <span className='nav-link-name'>Shifts</span>
                </Link>
                <Link to='/driver' className='nav-link'>
                  <i className='fa-solid fa-users nav-link-icon'></i>
                  <span className='nav-link-name'>Drivers</span>
                </Link>
                <Link to='/location' className='nav-link'>
                  <i className='fa-solid fa-map nav-link-icon'></i>
                  <span className='nav-link-name'>Routes</span>
                </Link>
              </div>
            </div>
  
        
          </nav>
        </aside>
  

      </main>
    );
  };
  
  export default Sidebar;