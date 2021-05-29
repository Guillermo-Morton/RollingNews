import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { campoRequerido } from "../helpers/validaciones";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_iyqHcH4ERBxkxOuuTmb3T");

const Sub = (props) => {
  // URL
  const URL3 = process.env.REACT_APP_API_URL3;
  // states
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
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
            "Te enviamos un email con los siguientes pasos",
            "success"
          );
          codigoUsuario();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };
  // funcione para obtener el codigo del usuario recien creado
  const codigoUsuario = async () => {
    try {
      const consulta = await fetch(URL3);
      const respuesta = await consulta.json();
      const usuarioFiltrado = respuesta.filter((user) => user.email === email);
      setCode(usuarioFiltrado[0].id);
      
    } catch (error) {
      console.log(error);
    }
  };

  // Funcion para verificar el usuario
  const sendEmail = () => {
    emailjs
      .send("service_p22wlsn", "template_jaxj4sg", {
        to_name: `${nombre}`,
        from_name: "Rollingnews",
        message: `Este es tu código único ;)`,
        id: `${code}`,
        message2: `Completá la verificación ingresando el código en el siguiente link`,
        link: `http://localhost:3000/suscribirse/verificar`,
        email: `${email}`,
      })
      .then(
        function (response) {
          console.log(response);
          setSent(true)
          props.history.push("/suscribirse/verificar");
        },
        function (error) {
          console.log(error);
        }
      );
  };
  
  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      sendEmail()
    }
  },[code]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
        setNombre("");
        setPass("");
        setEmail("");
    }
  },[sent]);
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

export default withRouter(Sub);
