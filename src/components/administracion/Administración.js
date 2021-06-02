import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";

const Administración = (props) => {
  // states
  const [usuarioLog, setUsuarioLog] = useState({});

  //   funcion para redirigir al inicio si no es el administrador
  const volverInicio = () => {
    setTimeout(() => {
      if (usuarioLog.nombre === "Admin") {
        console.log("Adminxd");
        return;
      } else {
        props.history.push("/");
      }
    }, 2000);
  };
  //   renderiza los componentes segun el usuario
  const permitirAdministracion =
    usuarioLog.nombre === "Admin" ? (
      <Fragment>
        <h2 className="text-center my-5">
          BIENVENIDO <br /> ADMINISTRADOR
        </h2>
        <div className="links-admin justify-content-center">
          <Link
            exact={true}
            to="administracion/noticias"
            className="boton-outline link-admin py-5 mx-2 d-flex align-items-center justify-content-center"
          >
            Noticias
          </Link>
          <Link
            exact={true}
            to="administracion/categorias"
            className="boton-outline link-admin py-5 mx-2 d-flex align-items-center justify-content-center"
          >
            Categorias
          </Link>
          <Link
            exact={true}
            to="administracion/nueva"
            className="boton link-admin py-5 mx-2 d-flex align-items-center justify-content-center"
          >
            Nueva noticia
          </Link>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <h1 className="display-2">Acceso restringido</h1>
        <p className="lead">Seccion para uso exclusivo del administrador</p>
      </Fragment>
    );

  // useEffect que actua cuando cambia la URL
  const location = useLocation();
  useEffect(() => {
    console.log("route has been changed");
    props.extraerLocal("usuarioLogueadoKey", setUsuarioLog);
  }, [location.pathname]);

  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      volverInicio();
    }
  });
  return (
    <div className="text-center bajar-footer d-flex flex-column justify-content-center">
      {permitirAdministracion}
      <p className="my-5">Información del sistema v0.1</p>
    </div>
  );
};

export default withRouter(Administración);
