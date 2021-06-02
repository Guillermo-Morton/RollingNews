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
          onClick={props.toggleScrollBottom}
          exact={true}
          to="/ingresar"
          className="boton-outline d-flex align-items-center"
        >
          Ingresar
        </NavLink>
        <NavLink
          onClick={props.toggleScrollBottom}
          exact={true}
          to="/suscribirse"
          className="boton d-flex align-items-center"
        >
          Registrate
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
  let body = document.getElementById("scrollLock");

  const scrollLock = () => {
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
      body.style =
        "display:flex; flex-direction: column; min-height: 100vh; align-content: around";
    }
  };
  useEffect(() => {
    scrollLock();
  }, [isOpen]);

  // When the user scrolls the page, execute myFunction
  // Get the offset position of the navbar
  setTimeout(() => {
    window.onscroll = ()=> {
      animacionesNav();
    };
    var sticky = document.getElementById("navbar").offsetTop;
    var prevScrollpos = window.pageYOffset;
    function animacionesNav() {
      var currentScrollPos = window.pageYOffset;
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").classList.add("sticky");
      } else {
        document.getElementById("navbar").classList.remove("sticky");
      }
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").classList.add("mostrarnav");
        document.getElementById("navbar").classList.remove("ocultarnav");
      } else {
        document.getElementById("navbar").classList.add("ocultarnav");
        document.getElementById("navbar").classList.remove("mostrarnav");
      }
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").classList.add("shrink");
        document.getElementById("brand").classList.add("brandshrink");
      } else {
        document.getElementById("navbar").classList.remove("shrink");
        document.getElementById("brand").classList.remove("brandshrink");
      }
  
      prevScrollpos = currentScrollPos;
    }
  }, 1000);

  return (
    <div className="margen">
      <div className="bg-light">
        <Sidebar
          toggleScrollBottom={props.toggleScrollBottom}
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
        <Nav id="navbar">
          <NavLink
            onClick={props.toggleScroll}
            exact={true}
            to="/"
            className="text-decoration-none "
          >
            <h1 id='brand' className="font-weight-light text-center azul brand">
              Rolling<span className="font-weight-bold">news.</span>
            </h1>
          </NavLink>
          <Bars onClick={toggle} />
          <NavMenu className="align-self-center">
            {props.navegacion.map((categoria) => (
              <NavLink
                onClick={props.toggleScroll}
                key={categoria && categoria._id}
                className="text-decoration-none links"
                exact={true}
                to={`/categoria/${categoria && categoria._id}`}
              >
                {categoria && categoria.categoriaDisponible}
              </NavLink>
            ))}
            <NavLink onClick={toggle} to="#" className="text-decoration-none">
              Categorías
            </NavLink>
          </NavMenu>
        </Nav>
      </div>
    </div>
  );
};

export default withRouter(NavB);
