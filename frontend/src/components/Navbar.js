import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2>Admin Panel</h2>
      <div>
        <Link to="/employees">Employee List</Link>
        <Link to="/create-employee" style={{ marginLeft: '10px' }}>Create Employee</Link>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
