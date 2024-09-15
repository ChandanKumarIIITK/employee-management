import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css'; // Import the CSS file

function EmployeeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourse([...course, value]);
    } else {
      setCourse(course.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      alert('Employee Created Successfully');
      navigate('/employees');
    } catch (error) {
      console.error(error.response.data);
      alert('Error in creating employee');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="employee-form-container">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <select id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Course</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" value="MCA" onChange={handleCourseChange} />
                MCA
              </label>
              <label>
                <input type="checkbox" value="BCA" onChange={handleCourseChange} />
                BCA
              </label>
              <label>
                <input type="checkbox" value="BSC" onChange={handleCourseChange} />
                BSC
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
          </div>

          <button type="submit" className="submit-btn">Create Employee</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
