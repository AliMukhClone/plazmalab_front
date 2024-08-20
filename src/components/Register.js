import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const RegisterForm = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  div {
    margin-bottom: 15px;
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
    background: green;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
  }

  p {
    color: red;
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrors({ password2: 'Пароли не совпадают' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/register/', {
        username,
        email,
        password,
        password2,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      setIsAuthenticated(true);
      setUser({ username });

      navigate('/'); // Redirect to the home page after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Произошла ошибка при регистрации!', error);
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <div>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;