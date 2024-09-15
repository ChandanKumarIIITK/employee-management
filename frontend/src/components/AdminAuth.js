import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminAuth.css'; // Add your CSS file for styling

function AdminAuth() {
  const [isRegister, setIsRegister] = useState(true); // Toggle between register and login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const response = await axios.post(url, {
        username,
        password,
      });

      // Save the token to local storage and navigate to dashboard
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert(isRegister ? 'Error in registration' : 'Invalid login credentials');
    }
  };

  return (
    <div className="admin-auth-container">
      <h2>{isRegister ? 'Register as Admin' : 'Login as Admin'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button className="toggle-auth" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </button>
    </div>
  );
}

export default AdminAuth;
