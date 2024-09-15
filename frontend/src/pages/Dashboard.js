import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Welcome to the Admin Panel</h2>
        <Link to="/employees">
          <button>Manage Employees</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
