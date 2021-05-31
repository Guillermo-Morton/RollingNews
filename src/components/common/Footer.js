import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="d-flex align-items-center flex-column bg-light mt-5 py-3">
      <Link className="font-weight-light text-decoration-none lead azul">
        Rolling<span className="font-weight-bold">news.</span>
      </Link>
        <div className="d-md-flex text-center my-2">
          <NavLink to='' className="text-muted">Políticas de privacidad</NavLink>
          <NavLink to='' className="text-muted">Contacto</NavLink>
          <NavLink to='' className="text-muted">Contrato de suscripción</NavLink>
        </div>
        <p className='text-muted text-center'>&copy; Rollingnews 2021 todos los derechos reservados</p>
    </div>
  );
};

export default Footer;
