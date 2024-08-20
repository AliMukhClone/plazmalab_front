import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  a, button.link {
    margin: 0 15px;
    text-decoration: none;
    color: #000;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
  }

  a.contact {
    border: 2px solid #000;
    padding: 5px 15px;
    border-radius: 5px;
  }
`;

const HeroSection = styled.section`
  background: url('/assets/images/hero-image.png') no-repeat center center/cover;
  color: #00d26b;
  padding: 100px 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 40px;
  }

  button {
    background: green;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }
`;

const ServicesSection = styled.section`
  padding: 50px 0;
  background: #f8f8f8;
  text-align: center;

  h2 {
    font-size: 36px;
    margin-bottom: 30px;
  }

  .services {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .service-card {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin: 15px;
      padding: 20px;
      max-width: 350px;
      text-align: left;

      img {
        max-width: 100%;
        border-radius: 5px;
        height: 200px;
        width: 350px;
      }

      h3 {
        margin-top: 15px;
        font-size: 24px;
      }

      p {
        margin: 10px 0;
        font-size: 16px;
      }
    }
  }
`;

const Home = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HomeContainer>
      <Header>
        <Navbar>
          <Logo>ГЕНЕРАЦИЯ НАУЧНЫХ ПИСЕМ</Logo>
          <NavLinks>
            <Link to="/">Домой</Link>
            <Link to="/about">О нас</Link>
            <Link to="/contact" className="contact">Контактные данные</Link>
            {!isAuthenticated && <Link to="/login" className="login">Войти</Link>}
            {!isAuthenticated && <Link to="/register" className="login">Регистрация</Link>}
            {isAuthenticated && user && (
              <>
                <Link to="/profile" className="link">{user.username}</Link>
                <Link to="/" onClick={handleLogout} className="link">Выйти</Link>
              </>
            )}
          </NavLinks>
        </Navbar>
      </Header>
      <HeroSection>
        <HeroContent>
          <h1>Сгенерируйте научное письмо</h1>
          <p>С легкостью создайте академический контент</p>
        </HeroContent>
      </HeroSection>
      <ServicesSection>
        <h2>Наши услуги</h2>
        <div className="services">
          <div className="service-card">
            <img src="./images/dissertation.jpeg" alt="Service 1" />
            <h3>Генерация диссертаций</h3>
            <p>Создайте комплексную диссертацию, адаптированную под ваши нужды.</p>
            {isAuthenticated && <Link to="/articles/create/dissertation">Создать диссертацию</Link>}
          </div>
          <div className="service-card">
            <img src="./images/referat.jpeg" alt="Service 2" />
            <h3>Создание рефератов</h3>
            <p>Создайте хорошо исследованный реферат быстро и эффективно.</p>
            {isAuthenticated && <Link to="/articles/create/referat">Создать реферат</Link>}
          </div>
          <div className="service-card">
            <img src="./images/article.jpeg" alt="Service 3" />
            <h3>Генерация научных статей</h3>
            <p>Создавайте содержательные статьи с легкостью, используя наш инструмент.</p>
            {isAuthenticated && <Link to="/articles/create/research_article">Создать статью</Link>}
          </div>
        </div>
      </ServicesSection>
    </HomeContainer>
  );
};

export default Home;