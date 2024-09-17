import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-light py-3 mt-auto">
    <Container>
      <Row>
        <Col className="text-center">
          <p className="mb-0">© 2024 Luiz Santos. Todos os direitos reservados.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;