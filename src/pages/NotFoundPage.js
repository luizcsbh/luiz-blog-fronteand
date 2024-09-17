// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está tentando acessar não existe.</p>
      <Link to="/home" className="btn btn-primary">Voltar para a Home</Link>
    </div>
  );
};

export default NotFoundPage;