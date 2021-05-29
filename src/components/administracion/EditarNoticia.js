import React, { useState, useEffect, useRef, Fragment } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useParams, withRouter, useLocation } from "react-router";
import { campoRequerido } from "../helpers/validaciones";
import Swal from "sweetalert2";

const EditarNoticia = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  // obtengo el parametro de la URL
  const { id } = useParams();
  // declaro los state
  const [noticia, setNoticia] = useState({});
  const [error, setError] = useState(false);
  // usuario logueado
  const [usuarioLog, setUsuarioLog] = useState({});
  // crear useRef
  const tituloRef = useRef("");
  const subtituloRef = useRef("");
  const parrafo1Ref = useRef("");
  const categoriaRef = useRef("");
  const parrafo2Ref = useRef("");
  const parrafo3Ref = useRef("");
  const imagen1Ref = useRef("");
  const imagen2Ref = useRef("");
  //   Traer los datos del objeto a editar
  useEffect(() => {
    consultarNoticia();
  }, []);
  // Creamos la funcion para consultar los datos

  const consultarNoticia = async () => {
    try {
      const respuesta = await fetch(URL + `/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setNoticia(resultado);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   validar datos, si falla mostrar alert
    if (
      campoRequerido(tituloRef.current.value) &&
      campoRequerido(subtituloRef.current.value) &&
      campoRequerido(parrafo1Ref.current.value) &&
      campoRequerido(parrafo2Ref.current.value) &&
      campoRequerido(parrafo3Ref.current.value) &&
      campoRequerido(imagen1Ref.current.value) &&
      campoRequerido(imagen2Ref.current.value) &&
      campoRequerido(categoriaRef.current.value)
    ) {
      // enviamos el objeto a la api
      // crear el objeto a enviar
      const noticiaEditada = {
        titulo: tituloRef.current.value,
        subtitulo: subtituloRef.current.value,
        parrafo1: parrafo1Ref.current.value,
        parrafo2: parrafo2Ref.current.value,
        parrafo3: parrafo3Ref.current.value,
        categoria: categoriaRef.current.value,
        imagen1: imagen1Ref.current.value,
        imagen2: imagen2Ref.current.value,
      };
      try {
        const respuesta = await fetch(URL + "/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticiaEditada),
        });
        if (respuesta.status === 200) {
          Swal.fire(
            "Noticia editada",
            "Se modificaron los datos de la noticia",
            "success"
          );
          //   actualizar los datos de la api
          props.consultarAPI();
          // redireccionamos a la pagina de lista de producto
          props.history.push("/administracion/noticias");
        }
      } catch (error) {
        console.log(error);
      }
      setError(false);
    } else {
      // mostramos un error si falla la validacion
      setError(true);
      return;
    }
  };

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
        <h2 className="font-weight-light my-3 text-center">
          EDITAR UNA NOTICIA
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            {error === true ? (
              <Alert variant={"danger"}>
                Todos los campos son obligatorios
              </Alert>
            ) : null}
            <Form.Label>Título principal</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba un título"
              defaultValue={noticia.titulo}
              ref={tituloRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subtítulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba un subtítulo"
              defaultValue={noticia.subtitulo}
              ref={subtituloRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Archivo imagen 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: flores.jpg"
              defaultValue={noticia.imagen1}
              ref={imagen1Ref}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Archivo imagen 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: arboles.jpg"
              defaultValue={noticia.imagen2}
              ref={imagen2Ref}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Párrafo 1</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese hasta 200 caracteres"
              defaultValue={noticia.parrafo1}
              ref={parrafo1Ref}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Párrafo 2</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese hasta 200 caracteres"
              defaultValue={noticia.parrafo2}
              ref={parrafo2Ref}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Párrafo 3</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese hasta 200 caracteres"
              defaultValue={noticia.parrafo3}
              ref={parrafo3Ref}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Seleccionar categoría</Form.Label>
            <Form.Control as="select" ref={categoriaRef}>
              <option value={noticia.categoria}>Sin modificar</option>
              {props.categorias.map((categoria) => (
                <option>{categoria.categoriaDisponible}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </Form>
      </Fragment>
    ) : (
      <Fragment>
        <div className="text-center">
          <h1 className="display-2">Acceso restringido</h1>
          <p className="lead">Sección para uso exclusivo del administrador</p>
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
    <div className="container">
      {permitirAdministracion}
      <p className="my-5  text-center">Información del sistema v0.1</p>
    </div>
  );
};

export default withRouter(EditarNoticia);
