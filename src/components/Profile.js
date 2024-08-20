import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const ProfileContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Header = styled.header`
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
`;

const HomeButton = styled(Link)`
  text-decoration: none;
  color: #fff;
  background: #00d26b;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const SectionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const Section = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ArticleItem = styled.li`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: 20px;
  }

  a {
    text-decoration: none;
    color: blue;
    font-weight: bold;
  }
`;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [referats, setReferats] = useState([]);
  const [dissertations, setDissertations] = useState([]);
  const [researchArticles, setResearchArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:8000/articles/list/', {
          headers: { Authorization: `Token ${token}` },
        });
        setArticles(response.data);
        setReferats(response.data.filter(article => article.document_type === 'referat'));
        setDissertations(response.data.filter(article => article.document_type === 'dissertation'));
        setResearchArticles(response.data.filter(article => article.document_type === 'research_article'));
      }
    };

    fetchArticles();
  }, []);

  return (
    <ProfileContainer>
      <Header>
        <ProfileTitle>Профиль пользователя: {user && user.username}</ProfileTitle>
        <HomeButton to="/">Домой</HomeButton>
      </Header>
      <SectionsContainer>
        <Section>
          <SectionTitle>Ваши диссертации</SectionTitle>
          <ArticleList>
            {dissertations.map((article) => (
              <ArticleItem key={article.id}>
                <h4>{article.title}</h4>
                <a href={article.file} download>Скачать</a>
              </ArticleItem>
            ))}
          </ArticleList>
        </Section>
        <Section>
          <SectionTitle>Ваши рефераты</SectionTitle>
          <ArticleList>
            {referats.map((article) => (
              <ArticleItem key={article.id}>
                <h4>{article.title}</h4>
                <a href={article.file} download>Скачать</a>
              </ArticleItem>
            ))}
          </ArticleList>
        </Section>
        <Section>
          <SectionTitle>Ваши научные статьи</SectionTitle>
          <ArticleList>
            {researchArticles.map((article) => (
              <ArticleItem key={article.id}>
                <h4>{article.title}</h4>
                <a href={article.file} download>Скачать</a>
              </ArticleItem>
            ))}
          </ArticleList>
        </Section>
      </SectionsContainer>
    </ProfileContainer>
  );
};

export default Profile;