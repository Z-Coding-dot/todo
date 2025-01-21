import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fs-5 ">
      <div className="container" style={{ color:'#ae86ff'}}>
        <Link className="navbar-brand fw-bold fs-4"style={{ color:'#ae86ff'}} to="/">
          TodoApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"  id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/todo">
                Todo List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
