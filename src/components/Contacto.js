import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import fullstack from "../img/goyi.jpg";

import Swal from "sweetalert2";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_iyqHcH4ERBxkxOuuTmb3T");

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendEmail();
  };
  const sendEmail = () => {
    emailjs.send("service_p22wlsn", "template_q8u90rx", {
        to_name: `${nombre}`,
        message: `${mensaje}`,
        email: `${email}`,
      })
      .then(
        function (response) {
          console.log(response);
          Swal.fire(
            "¡Enviado!",
            "Tu consulta nos llegó con exito",
            "success"
          );
        },
        function (error) {
          console.log(error);
          Swal.fire(
            "¡Opps!",
            "Ocurrió un error, intente de nuevo mas tarde",
            "error"
          );
        }
      );
  };
  return (
    <div className="bajar-footer d-flex flex-column justify-content-center container">
      <div className="my-3">
        <h1 className="text-center my-5">Nuestro desarrollador Full Stack</h1>
        <img
          className="w-25 d-block mx-auto my-4 rounded-circle"
          src={fullstack}
          alt="foto del desarrollador"
        />
        <p className="lead my-4 text-center">Guillermo Morton</p>
      </div>
      <hr />
      <div className="my-3 d-flex flex-column align-items-center">
        <h3>¿Tienes alguna duda?</h3>
        <Form onSubmit={handleSubmit} className="text-center w-75">
          <Form.Group>
            <Form.Label className="">Tu nombre de usuario</Form.Label>
            <Form.Control
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              placeholder="Jorgito"
              value={nombre}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="">Tu email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="jorge@jpclub.com"
              value={email}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="">Tu consulta va aqui</Form.Label>
            <Form.Control
              onChange={(e) => setMensaje(e.target.value)}
              maxLength='400'
              as="textarea"
              rows={5}
              value={mensaje}
              required
              placeholder="Ingrese hasta 400 caracteres"
            />
          </Form.Group>
          <Button type="submit" className="boton">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Contacto;
