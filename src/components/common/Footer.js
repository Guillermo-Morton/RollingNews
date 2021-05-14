import React from "react";
import {Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="d-flex align-items-center flex-column bg-light my-5 py-3">
      <a className="font-weight-lighttext-primary lead">
        Rolling<span className="font-weight-bold">news.</span>
      </a>
        <div className="d-flex">
          <Nav.Link className="text-muted">Políticas de privacidad</Nav.Link>
          <Nav.Link className="text-muted">Contacto</Nav.Link>
          <Nav.Link className="text-muted">Contrato de suscripción</Nav.Link>
        </div>
        <p></p>
    </div>
  );
};

export default Footer;
