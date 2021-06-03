import React from "react";
import { Link, NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className="d-flex align-items-center flex-column bg-light py-3 mt-4">
      <Link onClick={props.toggleScroll} className="font-weight-light text-decoration-none lead azul">
        Rolling<span className="font-weight-bold">news.</span>
      </Link>
        <div className="d-flex footer text-center my-2">
          <NavLink onClick={props.toggleScroll} to='/error404' className="text-dark px-2 my-2 fuentesFooter">Políticas de privacidad</NavLink>
          <NavLink onClick={props.toggleScroll} to='/contacto' className="text-dark px-2 my-2 fuentesFooter">Contacto</NavLink>
          <NavLink onClick={props.toggleScroll} to='/error404' className="text-dark px-2 my-2 fuentesFooter">Contrato de suscripción</NavLink>
        </div>
        <p className='text-dark text-center px-2 fuentesFooter'>&copy; Rollingnews 2021 todos los derechos reservados</p>
    </div>
  );
};

export default Footer;
