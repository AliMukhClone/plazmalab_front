import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled.div`
  a {
    margin: 0 15px;
    text-decoration: none;
    color: #000;
    font-weight: 500;
    pointer-events: ${props => (props.isLoading ? 'none' : 'auto')};
    opacity: ${props => (props.isLoading ? '0.5' : '1')};
  }

  a.contact {
    border: 2px solid #000;
    padding: 5px 15px;
    border-radius: 5px;
  }
`;

const Form = styled.form`
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
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: ${props => (props.isLoading ? '#f2f2f2' : '#fff')};
    pointer-events: ${props => (props.isLoading ? 'none' : 'auto')};
  }

  button {
    background: ${props => (props.isDisabled || props.isLoading) ? 'gray' : 'green'};
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: ${props => (props.isDisabled || props.isLoading) ? 'not-allowed' : 'pointer'};
    font-size: 18px;
    width: 100%;
  }

  p {
    color: red;
    margin: 5px 0 0;
    font-size: 14px;
  }
`;

const DownloadLink = styled.a`
  display: block;
  margin-top: 20px;
  color: green;
  text-decoration: underline;
`;

const Message = styled.p`
  color: #333;
  margin-top: 20px;
  font-size: 16px;
`;

function CreateReferat() {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Генерация документа может занять некоторое время. Пожалуйста, подождите...');
    setDownloadLink(''); // Clear download link
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/articles/create/',
        { title, document_type: 'referat' },
        { headers: { Authorization: `Token ${token}` } }
      );
      setDownloadLink(response.data.file); // Используем прямую ссылку из ответа
      setTitle('');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Произошла ошибка при создании реферата!', error);
      }
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  };

  const isDisabled = title.length < 5;

  return (
    <FormContainer>
      <Header>
        <Navbar isLoading={isLoading}>
          <NavLinks isLoading={isLoading}>
            <Link to="/" className="contact">Домой</Link>
          </NavLinks>
        </Navbar>
      </Header>
      <Form onSubmit={handleSubmit} isLoading={isLoading} isDisabled={isDisabled}>
        <h2>Создание реферата</h2>
        <div>
          <input
            type="text"
            placeholder="Введите тему реферата"
            value={title}
            onChange={handleTitleChange}
            isLoading={isLoading}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <button type="submit" disabled={isLoading || isDisabled}>
          {isLoading ? 'Создание...' : 'Создать реферат'}
        </button>
        {message && <Message>{message}</Message>}
        {downloadLink && (
          <DownloadLink href={downloadLink} target="_blank" rel="noopener noreferrer">
            Скачать реферат
          </DownloadLink>
        )}
      </Form>
    </FormContainer>
  );
}

export default CreateReferat;