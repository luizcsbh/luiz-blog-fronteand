import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');


  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login'; // Redirecionar para a página de login após logout
  };

  return (
    <header>
      <Navbar expand="lg" >
        <Container>
          <Navbar.Brand as={Link} to="/home">Luiz Santos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/blog">Artigos</Nav.Link>

              {/* Verifica se o usuário está logado */}
              {token && (
                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

                  {/* Verifica se o usuário é administrador */}
                  {role === 'admin' && (
                    <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link>
                  )}
                </>
              )}
            </Nav>

            {/* Botões de login/logout */}
            <Nav>
              {!token ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              ) : (
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;