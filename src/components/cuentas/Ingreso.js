import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { campoRequerido } from "../helpers/validaciones";

const Ingreso = (props) => {
  // URL
  const URL3 = process.env.REACT_APP_API_URL3;
  // states
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLog, setUsuarioLog] = useState({});
  const [log, setLog] = useState(false);
  const [error, setError] = useState(false);
  // funcion handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (campoRequerido(nombre) && campoRequerido(pass)) {
      consultarUsuarios();
      setError(false);
      setLog(true);
    } else {
      setError(true);
    }
  };

  // funcion para consultar los ususarios
  const consultarUsuarios = async () => {
    try {
      const consulta = await fetch(URL3);
      const respuesta = await consulta.json();
      setUsuarios(respuesta);
      // confirmamos si los datos ingresados coinciden con los de algun usuario
      for (let i in respuesta) {
        if (
          respuesta[i].nombre === nombre &&
          respuesta[i].pass === pass &&
          respuesta[i].verified === true
        ) {
          setUsuarioLog(respuesta[i]);
          // redireccionamos a otra ruta
          props.history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginLocal = () => {
    if (log) {
      console.log(true);
      localStorage.setItem("usuarioLogueadoKey", JSON.stringify(usuarioLog));
    } else {
      console.log(false);
    }
  };
  useEffect(() => {
    loginLocal();
  }, [usuarioLog]);

  return (
    <div className="container my-5">
      <h2 className="my-4 text-center font-weight-light">
        Ingresá con tu cuenta
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
          <Form.Label className="mt-4">Contraseña</Form.Label>
          <Form.Control
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Contraseña"
            value={pass}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <a className="text-muted">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="d-flex justify-content-center">
          <Button className='boton px-5 btn' type="submit">
            Inicia sesion
          </Button>
          <Link
            exact={true}
            to="/suscribirse"
            className="mx-2 px-5  boton-outline d-flex align-items-center"
          >
            Suscríbete
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default withRouter(Ingreso);
