import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { withRouter, useLocation } from "react-router";
import Swal from "sweetalert2";

const NuevaNoticia = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  // states
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [parrafo1, setParrafo1] = useState("");
  const [parrafo2, setParrafo2] = useState("");
  const [parrafo3, setParrafo3] = useState("");
  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [autor, setAutor] = useState("");
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState("Actualidad");
  const [error, setError] = useState(false);
  // usuario logueado
  const [usuarioLog, setUsuarioLog] = useState({});

  // funcion handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      // validamos el formulario
      titulo.trim() === "" ||
      subtitulo.trim() === "" ||
      parrafo1.trim() === "" ||
      parrafo2.trim() === "" ||
      parrafo3.trim() === "" ||
      imagen1.trim() === "" ||
      imagen2.trim() === "" ||
      autor.trim() === "" ||
      fecha.trim() === "" ||
      categoria === ""
    ) {
      // mostramos un error si falla la validacion
      setError(true);
      return;
    } else {
      // enviamos el objeto a la api
      setError(false);
      // crear el objeto a enviar
      const datos = {
        titulo: titulo,
        subtitulo: subtitulo,
        parrafo1: parrafo1,
        parrafo2: parrafo2,
        parrafo3: parrafo3,
        categoria: categoria,
        imagen1: imagen1,
        imagen2: imagen2,
        autor: autor,
        fecha: fecha
      };
      try {
        const parametros = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };

        // ejecutar la solicitud
        const respuesta = await fetch(URL, parametros);
        if ((await respuesta.status) === 201) {
          Swal.fire(
            "Producto Agregado",
            "Se carg?? una noticia correctamente",
            "success"
          );
          // limpiar el formulario
          setTitulo("");
          setSubtitulo("");
          setParrafo1("");
          setParrafo2("");
          setParrafo3("");
          setImagen1("");
          setImagen2("");
          // setCategoria("");
          // consultamos la api
          props.consultarAPI();
          // redireccionamos a otra ruta
          props.history.push("/administracion/noticias");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   renderiza los componentes segun el usuario
  const permitirAdministracion =
    usuarioLog.nombre === "Admin" ? (
      <Fragment >
        <h2 className="font-weight-light my-3 text-center">
          AGREGAR UNA NUEVA NOTICIA
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            {error === true ? (
              <Alert variant={"danger"}>
                Todos los campos son obligatorios
              </Alert>
            ) : null}
            <Form.Label>T??tulo principal</Form.Label>
            <Form.Control
              onChange={(e) => setTitulo(titulo.length > 150 ? e.target.value.slice(0, 150) : e.target.value)}
              type="text"
              placeholder="Escriba un t??tulo"
              value={titulo}
              maxLength='150'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subt??tulo</Form.Label>
            <Form.Control
              onChange={(e) => setSubtitulo(subtitulo.length > 150 ? e.target.value.slice(0, 150) : e.target.value)}
              type="text"
              placeholder="Escriba un subt??tulo"
              value={subtitulo}
              maxLength='150'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Archivo imagen 1</Form.Label>
            <Form.Control
              onChange={(e) => setImagen1(imagen1.length > 1000 ? e.target.value.slice(0, 1000) : e.target.value)}
              type="text"
              placeholder="Ejemplo: flores.jpg"
              value={imagen1}
              maxLength='1000'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Archivo imagen 2</Form.Label>
            <Form.Control
              onChange={(e) => setImagen2(imagen2.length > 1000 ? e.target.value.slice(0, 1000) : e.target.value)}
              type="text"
              placeholder="Ejemplo: arboles.jpg"
              value={imagen2}
              maxLength='1000'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>P??rrafo 1</Form.Label>
            <Form.Control
              onChange={(e) => setParrafo1(parrafo1.length > 800 ? e.target.value.slice(0, 800) : e.target.value)}
              as="textarea"
              rows={3}
              value={parrafo1}
              placeholder="Ingrese hasta 800 caracteres"
              maxLength='800'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>P??rrafo 2</Form.Label>
            <Form.Control
              onChange={(e) => setParrafo2(parrafo2.length > 800 ? e.target.value.slice(0, 800) : e.target.value)}
              as="textarea"
              rows={3}
              value={parrafo2}
              placeholder="Ingrese hasta 800 caracteres"
              maxLength='800'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>P??rrafo 3</Form.Label>
            <Form.Control
              onChange={(e) => setParrafo3(parrafo3.length > 800 ? e.target.value.slice(0, 800) : e.target.value)}
              as="textarea"
              rows={3}
              value={parrafo3}
              placeholder="Ingrese hasta 800 caracteres"
              maxLength='800'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Autor</Form.Label>
            <Form.Control
              onChange={(e) => setAutor(autor.length > 30 ? e.target.value.slice(0, 30) : e.target.value)}
              type='text'
              value={autor}
              maxLength='30'
              placeholder="Ingrese el autor de la noticia"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              onChange={(e) => setFecha(fecha.length > 20 ? e.target.value.slice(0, 0) : e.target.value)}
              type='date'
              value={fecha}
              placeholder="Ingrese la fecha"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Seleccionar categor??a</Form.Label>
            <Form.Control
              onChange={(e) => setCategoria(e.target.value)}
              as="select"
            >
              {props.categorias.map((categoria) => (
                <option>{categoria.categoriaDisponible}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className='boton' type="submit">
            Agregar
          </Button>
        </Form>
      </Fragment>
    ) : (
      <Fragment>
        <div className='text-center'>
        <h1 className="display-2">Acceso restringido</h1>
        <p className="lead">Seccion para uso exclusivo del administrador</p>
        </div>
      </Fragment>
    );
  //   funcion para redirigir al inicio si no es el administrador
  const volverInicio = () => {
    setTimeout(() => {
      if (usuarioLog.nombre === "Admin") {
        return;
      } else {
        props.history.push("/");
      }
    }, 2000);
  };
  // useEffect que actua cuando cambia la URL
  const location = useLocation();
  useEffect(() => {
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
      <p className="my-5  text-center">Informaci??n del sistema v0.1</p>
    </div>
  );
};

export default withRouter(NuevaNoticia);
