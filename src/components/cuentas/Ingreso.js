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
  const [errorNombre, setErrorNombre] = useState(undefined);
  const [errorPass, setErrorPass] = useState(undefined);
  const [notVerified, setNotVerified] = useState(false);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState({});
  // funcion handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (campoRequerido(nombre) && campoRequerido(pass)) {
      loguear();
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
    } catch (error) {
      console.log(error);
    }
  };
  const loguear = async () => {
    try {
      const consulta = await fetch(URL3);
      const respuesta = await consulta.json();
      // confirmamos si los datos ingresados coinciden con los de algun usuario
      validarGeneral();
      for (let i in respuesta) {
        if (respuesta[i].nombre === nombre) {
          setUsuarioEncontrado(respuesta[i]);
        }
        if (
          respuesta[i].nombre === nombre &&
          respuesta[i].pass === pass &&
          respuesta[i].verified === true
        ) {
          setUsuarioLog(respuesta[i]);
          // redireccionamos a otra ruta
          props.history.push("/");
          props.toggleScroll();
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

  const validarGeneral = () => {
    let nombreReturn = validarNombre();
    let passReturn = validarPass();
    console.log(nombreReturn);
    console.log(passReturn);
  };

  const validarNombre = () => {
    for (let i in usuarios) {
      if (usuarios[i].nombre === nombre.trim()) {
        setErrorNombre(false);
        console.log("User found");
        return true;
      } else {
        setErrorNombre(true);
        setNombre("");
        return false;
      }
    }
  };
  const validarPass = () => {
    for (let i in usuarios) {
      if (usuarios[i].pass === pass.trim()) {
        setErrorPass(false);
        console.log("Contraseña correcta");
        return true;
      } else {
        setErrorPass(true);
        setPass("");
        return false;
      }
    }
  };
  const nombreInvalido = errorNombre === true ? "is-invalid" : "";
  const nombreValido = errorNombre === false ? "is-valid" : "";
  const passInvalido = errorPass === true ? "is-invalid" : "";
  const passValido = errorPass === false ? "is-valid" : "";

  useEffect(() => {
    loginLocal();
  }, [usuarioLog]);
  useEffect(() => {
    consultarUsuarios();
  }, []);

  return (
    <div className="container my-2 bajar-footer d-flex flex-column justify-content-center">
      <h2 className="my-4 text-center font-weight-light">
        Ingresá con tu cuenta
      </h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group>
          {error === true ? (
            <Alert className="small text-center">
              Todos los campos son obligatorios
            </Alert>
          ) : null}
          {notVerified === true ? (
            <Alert className="small text-center">
              Completa la verificacion de tu usuario para poder ingresar
            </Alert>
          ) : null}
          <Form.Label>Tu nombre de usuario</Form.Label>
          <Form.Control
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Jorgito"
            value={nombre}
            className={`${nombreValido} ${nombreInvalido}`}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Contraseña</Form.Label>
          <Form.Control
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Contraseña"
            value={pass}
            className={`${passInvalido} ${passValido}`}
          />
          {errorPass === true || errorNombre === true ? (
            <Alert className="small text-center">
              Usuario o contraseña incorrectos
            </Alert>
          ) : null}
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <a className="text-muted">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="d-flex justify-content-center">
          <Button className="boton btn" type="submit">
            Inicia sesion
          </Button>
          <Link
            onClick={props.toggleScrollBottom}
            exact={true}
            to="/suscribirse"
            className="mx-2 boton-outline d-flex align-items-center"
          >
            Registrate
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default withRouter(Ingreso);
