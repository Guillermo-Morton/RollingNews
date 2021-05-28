import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { campoRequerido } from "../helpers/validaciones";

const Sub = () => {
  // URL
  const URL3 = process.env.REACT_APP_API_URL3;
  // states
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  // funcion handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      campoRequerido(nombre) &&
      campoRequerido(email) &&
      campoRequerido(pass)
    ) {
        setError(false);
      // enviamos el objeto a la base de datos
      const datos = {
        nombre,
        pass,
        verified,
        email,
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
        const respuesta = await fetch(URL3, parametros);
        if ((await respuesta.status) === 201) {
          Swal.fire(
            "Te registraste con exito",
            "Pronto verificaremos tu usuario",
            "success"
          );
          // limpiamos el formulario
          setNombre("");
          setPass("");
          setEmail("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
        setError(true);
    }
  };
  return (
    <div className="container my-5">
      <h2 className="my-4 text-center font-weight-light">
        Empezá creando tu cuenta
      </h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group>
          {error === true ? (
            <Alert variant={"danger"}>Todos los campos son obligatorios</Alert>
          ) : null}
          <Form.Label>Tu nombre de usuario</Form.Label>
          <Form.Control
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Jorgito"
            value={nombre}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Tu email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="jorge@jpclub.com"
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Contraseña</Form.Label>
          <Form.Control
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Contraseña"
            value={pass}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <a className="text-muted text-decoration-none">
            ¿Ya tenés una cuenta?{" "}
            <Link exact={true} to="/ingresar" className="text-decoration-none">
              Inicia sesion
            </Link>
          </a>
        </div>
        <div className="d-flex justify-content-center">
          <Button className="mx-2" variant="primary" type="submit">
            Suscríbete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Sub;
