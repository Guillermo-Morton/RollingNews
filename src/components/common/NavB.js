import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, FormControl, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, withRouter } from "react-router-dom";

const NavB = (props) => {
  // contiene el usuario logueado actualmente
  const [usuarioLog, setUsuarioLog] = useState({});

  const cerrarSesion = () => {
    setUsuarioLog({});
    setTimeout(() => {
    props.history.push('/')},300)
  };


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      className="nav-link"
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
      <NavLink
        exact={true}
        to="/ingresar"
        className="btn btn-outline-primary px-3 py-1"
      >
        Ingresar
      </NavLink>
    ) : (
      <Button
        className="px-3 py-1"
        variant="outline-primary"
        onClick={cerrarSesion}
      >
        Cerrar Sesion
      </Button>
    );
  const mostrarAdministracion =
    usuarioLog.nombre === "Admin" && usuarioLog._id === '60b459c2c51ad300211df3fe' ? (
      <NavLink
        exact={true}
        to="/administracion"
        className="btn btn-outline-primary px-3 py-1"
      >
        Administración
      </NavLink>
    ) : (
     null
    );

  const location = useLocation();

  useEffect(() => {
    props.extraerLocal('usuarioLogueadoKey',setUsuarioLog);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("usuarioLogueadoKey", JSON.stringify(usuarioLog));
  }, [usuarioLog]);

  return (
    <div className="bg-light">
      <div className="container-fluid py-2 px-3 d-flex justify-content-between">
        {mostrarIngresar}
        {mostrarAdministracion}
      </div>
      <Navbar
        className="d-md-flex flex-md-column"
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
      >
        <NavLink
          exact={true}
          to="/"
          className="text-primary text-decoration-none"
        >
          <h2 className="font-weight-light text-center">
            Rolling<span className="font-weight-bold">news.</span>
          </h2>
        </NavLink>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {props.navegacion.map((categoria) => (
              <NavLink
                key={categoria && categoria._id}
                className="nav-link"
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
                    className="nav-link"
                    exact={true}
                    to={`/categoria/${categoria && categoria._id}`}
                  >
                    {categoria && categoria.categoriaDisponible}
                  </NavLink>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(NavB);
