import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Navbar, Dropdown, FormControl, Button } from "react-bootstrap";
import { Link, useLocation, withRouter } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbar/NavbarElements";

const NavB = (props) => {
  // contiene el usuario logueado actualmente
  const [usuarioLog, setUsuarioLog] = useState({});

  const cerrarSesion = () => {
    setUsuarioLog({});
    setTimeout(() => {
      props.history.push("/");
    }, 300);
  };

  const mostrarIngresar =
    usuarioLog.nombre === undefined ? (
      <Fragment>
        <NavLink
          exact={true}
          to="/ingresar"
          className="boton-outline d-flex align-items-center"
        >
          Ingresar
        </NavLink>
        <NavLink
          exact={true}
          to="/suscribirse"
          className="boton d-flex align-items-center"
        >
          Suscribirse
        </NavLink>
      </Fragment>
    ) : (
      <Fragment>
        <Button
          className="boton-outline responsive-boton1"
          onClick={cerrarSesion}
        >
          Cerrar Sesion
        </Button>
      </Fragment>
    );
  const mostrarAdministracion =
    usuarioLog.nombre === "Admin" &&
    usuarioLog._id === "60b459c2c51ad300211df3fe" ? (
      <NavLink
        exact={true}
        to="/administracion"
        className="boton d-flex align-items-center"
      >
        Administración
      </NavLink>
    ) : null;

  const location = useLocation();

  useEffect(() => {
    props.extraerLocal("usuarioLogueadoKey", setUsuarioLog);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("usuarioLogueadoKey", JSON.stringify(usuarioLog));
  }, [usuarioLog]);

  // responsive navbar

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  
  // scroll lock cuando abrimos el boton hamburguesa
  let body=document.getElementById('scrollLock')

  const scrollLock =()=>{
    if(isOpen){
      body.style.overflow='hidden'
    }else{
      body.style.overflow='visible'
    }
  }
  useEffect(()=>{
    scrollLock();
  },[isOpen])

  return (
    <div className='margen'>
      <div className="bg-light fixed-top">
        <Sidebar
          toggleScroll={props.toggleScroll}
          cerrarSesion={cerrarSesion}
          usuarioLog={usuarioLog}
          categorias={props.categorias}
          isOpen={isOpen}
          toggle={toggle}
          mostrarIngresar={mostrarIngresar}
          mostrarAdministracion={mostrarAdministracion}
        ></Sidebar>
        <div className="container-fluid py-2 px-3 justify-content-between topbar ">
          {mostrarIngresar}
          {mostrarAdministracion}
        </div>
        <Nav>
          <NavLink
            onClick={props.toggleScroll}
            exact={true}
            to="/"
            className="text-primary text-decoration-none "
          >
            <h1 className="font-weight-light text-center azul brand ">
              Rolling<span className="font-weight-bold">news.</span>
            </h1>
          </NavLink>
          <Bars onClick={toggle} />
          <NavMenu className="align-self-center">
            {props.navegacion.map((categoria) => (
              <NavLink
                onClick={props.toggleScroll}
                key={categoria && categoria._id}
                className="text-decoration-none"
                exact={true}
                to={`/categoria/${categoria && categoria._id}`}
              >
                {categoria && categoria.categoriaDisponible}
              </NavLink>
            ))}
            <NavLink onClick={toggle} to='#' className='text-decoration-none'>Categorías</NavLink>
          </NavMenu>
        </Nav>
      </div>
    </div>
  );
};

export default withRouter(NavB);
