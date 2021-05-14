import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavB = () => {
  return (
    <div className='bg-light'>
      <div className='d-flex justify-content-between container-fluid py-2'>
        <Nav.Link className='btn btn-outline-primary px-5 py-1' href="#">Features</Nav.Link>
        <Nav.Link className='btn btn-outline-primary px-5 py-1' href="#">Pricing</Nav.Link>
      </div>
      <Navbar className='d-flex flex-column' collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand className='mx-auto text-primary' href="#home"><h2 className='font-weight-light'>Rolling<span className='font-weight-bold'>news.</span></h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavB;
