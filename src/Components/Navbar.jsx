import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import {Nav} from '../Constants/Navbar';

const Navbar = ({selectedCategory, setSelectedCategory}) => {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
  <Link to={'/'} onClick={() => setSelectedCategory('general')} className="navbar-brand">News-Monk</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    <ul className='navbar-nav' >
      {
        Nav.map((head) => (
          <li className='nav-item' key={head._id} >
            <NavLink className='nav-link' to={`/${head.category}`} onClick={() => setSelectedCategory(!head.category ? 'general' : head.category)} >{head.name}</NavLink>
          </li>
        ))
      }
    </ul>
    
    </div>
  </div>
</nav>

  )
}

export default Navbar
