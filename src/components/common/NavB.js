import React, { useState}  from "react";
import { Navbar, Nav, Dropdown, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavB = () => {
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      
      className='nav-link'
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          hrex=''
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
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );



  return (
    <div className="bg-light">
      <div className="container-fluid py-2 px-3 d-flex justify-content-between">
        <NavLink exact={true} to="/ingresar" className="btn btn-outline-primary px-3 py-1">
          Ingresar
        </NavLink>
        <NavLink exact={true} to="/administracion" className="btn btn-outline-primary px-3 py-1">
          Administración
        </NavLink>
      </div>
      <Navbar
        className='d-md-flex flex-md-column'
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
      >
        <NavLink exact={true} to='/' className="text-primary text-decoration-none">
          <h2 className="font-weight-light text-center">
            Rolling<span className="font-weight-bold">news.</span>
          </h2>
        </NavLink>
 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink className="nav-link" exact={true} to="/">
              Actualidad
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/categoria">
              Espectáculos
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/a">
              Tecnología
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/a">
              Deportes
            </NavLink>
              <Dropdown>
                <Dropdown.Toggle  as={CustomToggle} id="dropdown-basic">
                  Categorías
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  <NavLink className='nav-link' exact={true} to="/a">Política</NavLink>
                  <NavLink className='nav-link' exact={true} to="/a">Economía</NavLink>
                  <NavLink className='nav-link' exact={true} to="/a">Salud</NavLink>
                  <NavLink className='nav-link' exact={true} to="/a">Fotografía </NavLink>
                </Dropdown.Menu>
              </Dropdown>      
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
  );
};

export default NavB;
