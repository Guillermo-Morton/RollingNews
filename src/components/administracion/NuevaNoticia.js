import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { withRouter } from "react-router";
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
  const [categoria, setCategoria] = useState("espectaculos");
  const [error, setError] = useState(false);

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
        console.log(respuesta);
        if ((await respuesta.status) === 201) {
          Swal.fire(
            "Producto Agregado",
            "Se cargó una noticia correctamente",
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
          setCategoria("");
          // consultamos la api
          props.consultarAPI();
          // redireccionamos a otra ruta
          props.history.push('/administracion/noticias')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="font-weight-light my-3 text-center">
        AGREGAR UNA NUEVA NOTICIA
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          {error === true ? (
            <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
          ) : null}
          <Form.Label>Título principal</Form.Label>
          <Form.Control
            onChange={(e) => setTitulo(e.target.value)}
            type="text"
            placeholder="Escriba un título"
            value={titulo}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control
            onChange={(e) => setSubtitulo(e.target.value)}
            type="text"
            placeholder="Escriba un subtítulo"
            value={subtitulo}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Archivo imagen 1</Form.Label>
          <Form.Control
            onChange={(e) => setImagen1(e.target.value)}
            type="text"
            placeholder="Ejemplo: flores.jpg"
            value={imagen1}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Archivo imagen 2</Form.Label>
          <Form.Control
            onChange={(e) => setImagen2(e.target.value)}
            type="text"
            placeholder="Ejemplo: arboles.jpg"
            value={imagen2}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Párrafo 1</Form.Label>
          <Form.Control
            onChange={(e) => setParrafo1(e.target.value)}
            as="textarea"
            rows={3}
            value={parrafo1}
            placeholder="Ingrese hasta 200 caracteres"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Párrafo 2</Form.Label>
          <Form.Control
            onChange={(e) => setParrafo2(e.target.value)}
            as="textarea"
            rows={3}
            value={parrafo2}
            placeholder="Ingrese hasta 200 caracteres"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Párrafo 3</Form.Label>
          <Form.Control
            onChange={(e) => setParrafo3(e.target.value)}
            as="textarea"
            rows={3}
            value={parrafo3}
            placeholder="Ingrese hasta 200 caracteres"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Seleccionar categoría</Form.Label>
          <Form.Control
            onChange={(e) => setCategoria(e.target.value)}
            as="select"
            value={categoria}
          >
            <option value="espectaculos">Espectáculos</option>
            <option value="tecnologia">Tecnología</option>
            <option value="deportes">Deportes</option>
            <option value="politica">Política</option>
            <option value="economia">Economía</option>
            <option value="salud">Salud</option>
            <option value="fotografia">Fotografía</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(NuevaNoticia);
