import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute para proteger rotas
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo de autenticação simples

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;