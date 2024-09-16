import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h2>Welcome to the Admin Panel</h2>
        <div className="dashboard-actions">
          <Link to="/employees">
            <button className="dashboard-btn">Manage Employees</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
