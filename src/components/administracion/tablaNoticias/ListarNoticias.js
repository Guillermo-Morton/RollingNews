import React, { Fragment, useState, useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { withRouter, useLocation } from "react-router";
import NoticiaIndividual from "./NoticiaIndividual";

const ListarNoticias = (props) => {
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
        <h2 className="font-weight-light my-2">Lista de noticias</h2>
        <Table className="my-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Subtítulo</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {props.noticias.map((noticia) => (
              <NoticiaIndividual
                consultarAPI={props.consultarAPI}
                noticia={noticia}
                key={noticia._id}
              ></NoticiaIndividual>
            ))}
          </tbody>
        </Table>
      </Fragment>
    ) : (
      <Fragment>
        <div className="text-center">
          <h1 className="display-2">Acceso restringido</h1>
          <p className="lead">Seccion para uso exclusivo del administrador</p>
        </div>
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
    <div className="container  bajar-footer">
      {permitirAdministracion}
      <p className="my-5  text-center">Información del sistema v0.1</p>
    </div>
  );
};

export default withRouter(ListarNoticias);
