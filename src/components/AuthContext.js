import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/users/me/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setIsAuthenticated(true);
          setUser(response.data);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('http://localhost:8000/users/login/', {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser({ username });
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};