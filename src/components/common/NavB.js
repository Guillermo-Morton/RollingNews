import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Navbar, Dropdown, FormControl, Button } from "react-bootstrap";
import { Link, useLocation, withRouter } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { BiLogOut } from "react-icons/bi";

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      className=""
      ref={ref}
      to=""
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </Link>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          hrex=""
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-1 w-auto"
            placeholder="Filtrar..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled mx-2">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
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
        <Button className="boton-outline responsive-boton1" onClick={cerrarSesion}>
          <BiLogOut></BiLogOut> Cerrar Sesion
          
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


  const [isOpen, setIsOpen]=useState(false);

  const toggle=()=>{
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-light">
      <Sidebar cerrarSesion={cerrarSesion} usuarioLog={usuarioLog} categorias={props.categorias} isOpen={isOpen} toggle={toggle} mostrarIngresar={mostrarIngresar} mostrarAdministracion={mostrarAdministracion}></Sidebar>
      <div className="container-fluid py-2 px-3 justify-content-between topbar ">
        {mostrarIngresar}
        {mostrarAdministracion}
      </div>
      <Nav>
        <NavLink
          exact={true}
          to="/"
          className="text-primary text-decoration-none "
        >
          <h1 className="font-weight-light text-center azul ">
            Rolling<span className="font-weight-bold">news.</span>
          </h1>
        </NavLink>
        <Bars onClick={toggle} />
        <NavMenu className="align-self-center">
          {props.navegacion.map((categoria) => (
            <NavLink
              key={categoria && categoria._id}
              className="text-decoration-none"
              exact={true}
              to={`/categoria/${categoria && categoria._id}`}
            >
              {categoria && categoria.categoriaDisponible}
            </NavLink>
          ))}
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
              Categorías
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
              {props.dropdown.map((categoria) => (
                <NavLink
                  key={categoria && categoria._id}
                  className=""
                  exact={true}
                  to={`/categoria/${categoria && categoria._id}`}
                >
                  {categoria && categoria.categoriaDisponible}
                </NavLink>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default withRouter(NavB);
