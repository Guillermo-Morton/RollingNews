import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const NuevaCategoria = (props) => {
  const URL2 = process.env.REACT_APP_API_URL2;
  //   creamos los states
  const [categoriaDisponible, setCategoriaDisponible] = useState("");
  const [error, setError] = useState(false);

  //   funcion handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoriaDisponible.trim() === "") {
      // mostrar un error
      setError(true);
      return;
    } else {
      // enviamos el objeto a la api
      setError(false);
      //   creamos el objeto
      const datos = {
        categoriaDisponible: categoriaDisponible,
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
        const respuesta = await fetch(URL2, parametros);
        if ((await respuesta.status) === 201) {
          Swal.fire(
            "Categoria agregada",
            "Se cargó una nueva categoria",
            "success"
          );
          // limpiar el formulario
          setCategoriaDisponible("");
          // consultamos la api
          props.consultarCategoria();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {error === true ? (
        <Alert className='mb-1' variant={"danger"}>Este campo es obligatorio</Alert>
      ) : null}
      <Form onSubmit={handleSubmit} className="d-flex flex-grow ">
        <Form.Group className="w-100">
          <Form.Control
            onChange={(e) => setCategoriaDisponible(e.target.value)}
            type="text"
            value={categoriaDisponible}
            placeholder="Agregar una nueva categoría"
          />
        </Form.Group>
        <div>
          <Button type="submit" className="">
            Agregar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NuevaCategoria;
