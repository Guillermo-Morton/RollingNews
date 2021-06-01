import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="d-flex align-items-center flex-column bg-light mt-5 py-3">
      <Link className="font-weight-light text-decoration-none lead azul">
        Rolling<span className="font-weight-bold">news.</span>
      </Link>
        <div className="d-md-flex text-center my-2">
          <NavLink to='' className="text-dark px-2">Políticas de privacidad</NavLink>
          <NavLink to='' className="text-dark px-2">Contacto</NavLink>
          <NavLink to='' className="text-dark px-2">Contrato de suscripción</NavLink>
        </div>
        <p className='text-dark text-center px-2'>&copy; Rollingnews 2021 todos los derechos reservados</p>
    </div>
  );
};

export default Footer;
