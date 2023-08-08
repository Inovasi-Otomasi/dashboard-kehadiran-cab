import React, {useState} from 'react';
import '../styles/sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [show, setShow] = useState(false);
  
    return (
      <main className={show ? 'space-toggle' : null}>
        <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fa-solid fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
          </div>
        </header>
  
        <aside className={`sidebar ${show ? 'show_sidebar' : null}`}>
          <nav className='nav'>
            <div>
              <NavLink to='/' className='nav-logo'>
                <i className={`fas fa-home-alt nav-logo-icon`}></i>
                <span className='nav-logo-name'>Dashboard</span>
              </NavLink>
  
              <div className='nav-list'>
                <NavLink to='/shift' className='nav-link'>
                  <i className='fa-solid fa-clock nav-link-icon'></i>
                  <span className='nav-link-name'>Shifts</span>
                </NavLink>
                <NavLink to='/driver' className='nav-link'>
                  <i className='fa-solid fa-users nav-link-icon'></i>
                  <span className='nav-link-name'>Drivers</span>
                </NavLink>
                <NavLink to='/location' className='nav-link'>
                  <i className='fa-solid fa-map nav-link-icon'></i>
                  <span className='nav-link-name'>Routes</span>
                </NavLink>
              </div>
            </div>
  
        
          </nav>
        </aside>
  

      </main>
    );
  };
  
  export default Sidebar;