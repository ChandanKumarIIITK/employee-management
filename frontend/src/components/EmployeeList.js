import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './EmployeeList.css'; // Import the CSS file

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Track which employee is being edited
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: []
  });

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: {
          Authorization: token,
        },
      });
      setEmployees(res.data);
    };
    fetchEmployees();
  }, []);

  // Handle delete employee
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/employees/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  // Start editing the employee
  const handleEdit = (employee) => {
    setEditingEmployeeId(employee._id);
    setUpdatedEmployee({ ...employee });
  };

  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  // Save the updated employee details
  const handleSave = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/employees/${id}`, updatedEmployee, {
      headers: {
        Authorization: token,
      },
    });
    setEmployees(employees.map((employee) => (employee._id === id ? updatedEmployee : employee)));
    setEditingEmployeeId(null); // Exit edit mode after saving
  };

  return (
    <div>
      <Navbar />
      <div className="employee-list-container">
        <h2>Employee List</h2>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>
                  {employee.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${employee.image}`}
                      alt={employee.name}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                {/* Check if the employee is being edited */}
                {editingEmployeeId === employee._id ? (
                  <>
                    <td><input type="text" name="name" value={updatedEmployee.name} onChange={handleInputChange} /></td>
                    <td><input type="email" name="email" value={updatedEmployee.email} onChange={handleInputChange} /></td>
                    <td><input type="text" name="mobile" value={updatedEmployee.mobile} onChange={handleInputChange} /></td>
                    <td><input type="text" name="designation" value={updatedEmployee.designation} onChange={handleInputChange} /></td>
                    <td><input type="text" name="gender" value={updatedEmployee.gender} onChange={handleInputChange} /></td>
                    <td><input type="text" name="course" value={updatedEmployee.course.join(',')} onChange={handleInputChange} /></td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(employee._id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingEmployeeId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.course.join(', ')}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
