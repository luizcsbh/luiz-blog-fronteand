import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não houver token, redireciona para a página de login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bem-vindo ao Dashboard</h2>
      <p>Esta é uma página protegida. Você está autenticado.</p>
    </div>
  );
};

export default Dashboard;