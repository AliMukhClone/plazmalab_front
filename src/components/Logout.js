import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/users/logout/', {}, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      localStorage.removeItem('token');
      alert('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('There was an error logging out!', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;