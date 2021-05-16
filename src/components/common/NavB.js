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
      <div className="d-flex justify-content-between container-fluid py-2">
        <Nav.Link className="btn btn-outline-primary px-5 py-1" href="#">
          Features
        </Nav.Link>
        <Nav.Link className="btn btn-outline-primary px-5 py-1" href="#">
          Pricing
        </Nav.Link>
      </div>
      <Navbar
        className='d-md-flex flex-md-column'
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
      >
        <Navbar.Brand className="text-primary" href="#home">
          <h2 className="font-weight-light text-center">
            Rolling<span className="font-weight-bold">news.</span>
          </h2>
        </Navbar.Brand>
 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink className="nav-link" exact={true} to="/">
              Actualidad
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/espectaculos">
              Espectáculos
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/tecnologia">
              Tecnología
            </NavLink>
            <NavLink className="nav-link" exact={true} to="/deportes">
              Deportes
            </NavLink>
              <Dropdown>
                <Dropdown.Toggle  as={CustomToggle} id="dropdown-basic">
                  Categorías
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  <NavLink className='nav-link' exact={true} to="/politica">Política</NavLink>
                  <NavLink className='nav-link' exact={true} to="/economia">Economía</NavLink>
                  <NavLink className='nav-link' exact={true} to="/salud">Salud</NavLink>
                  <NavLink className='nav-link' exact={true} to="/fotografia">Fotografía </NavLink>
                </Dropdown.Menu>
              </Dropdown>      
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
  );
};

export default NavB;
