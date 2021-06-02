import React, { Fragment } from "react";
import {
  CloseIcon,
  SidebarContainer,
  Icon,
  SidebarMenu,
  SidebarWrapper,
  SidebarLink,
} from "./SidebarElements";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaUserCog } from "react-icons/fa"
import { Button } from "react-bootstrap";

const Sidebar = (props) => {

    const mostrarIngresar =
    props.usuarioLog.nombre === undefined ? (
      <Fragment className='mostrar-botones'>
        <SidebarLink
          onClick={props.toggleScrollBottom}
          exact={true}
          to="/ingresar"
          className="boton-outline d-flex align-items-center"
        >
          <FiLogIn className='mx-2'></FiLogIn> Ingresar
        </SidebarLink>
      </Fragment>
    ) : (
      <Fragment className=''>
        <Button className="boton-outline d-flex align-items-center" onClick={props.toggleScroll}  onClick={props.cerrarSesion} >
          <FiLogOut className='mx-2'></FiLogOut> Cerrar sesion
        </Button>
      </Fragment>
    );
  const mostrarAdministracion =
    props.usuarioLog.nombre === "Admin" &&
    props.usuarioLog._id === "60b459c2c51ad300211df3fe" ? (
      <SidebarLink
        onClick={props.toggleScroll}
        exact={true}
        to="/administracion"
        className="boton admin d-flex align-items-center"
      ><FaUserCog></FaUserCog>
      </SidebarLink>
    ) : null;



  return (
    <SidebarContainer onClick={props.toggle} isOpen={props.isOpen}>
      <Icon >
        <CloseIcon onClick={props.toggle} />
      </Icon>
      <SidebarWrapper>
      <div className="container-fluid py-2 px-3 mb-4 justify-content-center mostrar-botones">
        <div className='mx-1'> {mostrarIngresar}</div>
        <div className='mx-1'> {mostrarAdministracion}</div>
      </div>
        <SidebarMenu isOpen={props.isOpen}> 
          {props.categorias.map((categoria) => (
            <SidebarLink
              onClick={props.toggleScroll}
              key={categoria && categoria._id}
              className="text-decoration-none"
              exact={true}
              to={`/categoria/${categoria && categoria._id}`}
            >
              {categoria && categoria.categoriaDisponible}
            </SidebarLink>
          ))}
       
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
