import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Исправлен импорт Navigate
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateReferat from './components/CreateReferat';
import CreateDissertation from './components/CreateDissertation';
import CreateResearchArticle from './components/CreateResearchArticle';
import Profile from './components/Profile';
import { AuthProvider, AuthContext } from './components/AuthContext'; // Исправлен импорт AuthContext
import GlobalStyle from './components/GlobalStyle';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles/create/referat" element={<CreateReferat />} />
          <Route path="/articles/create/dissertation" element={<CreateDissertation />} />
          <Route path="/articles/create/research_article" element={<CreateResearchArticle />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;