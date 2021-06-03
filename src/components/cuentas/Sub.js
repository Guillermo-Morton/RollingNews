import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_iyqHcH4ERBxkxOuuTmb3T");

const Sub = (props) => {
  // URL
  const URL3 = process.env.REACT_APP_API_URL3;
  // states
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [verified] = useState(false);
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(undefined);
  const [errorNombre, setErrorNombre] = useState(undefined);
  const [errorPass, setErrorPass] = useState(undefined);
  const [code, setCode] = useState("");

  // funcion handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nombreValido === 'is-valid' &&
      emailValido === 'is-valid' &&
      passValido === 'is-valid'

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
      setCode(usuarioFiltrado[0]._id);

    } catch (error) {
      console.log(error);

    }
  };
  const recibirUsuarios = async () => {
    try {
      const consulta = await fetch(URL3);
      const respuesta = await consulta.json();
      setUsuarios(respuesta)
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
        link: `https://rollingnewsproject.netlify.app//suscribirse/verificar`,
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
  // restrospectiva de ingreso
  const validarNombre = () => {
    clearInterval();
    if (nombre === '') {
      setErrorNombre(undefined)
      return false
    } else {
      for (let i in usuarios) {
        if (usuarios[i].nombre === nombre.trim()) {
          setErrorNombre(true)
          console.log("Este nombre de usuario está en uso")
          return false
        } else {
          setErrorNombre(false)
          return true
        }
      }
    }
  }
  const validarEmail = () => {
    if (email === '') {
      setErrorEmail(undefined)
      return false
    } else {
      for (let i in usuarios) {
        if (usuarios[i].email === email.trim()) {
          setErrorEmail(true)
          console.log("Este email está en uso")
          return false
        } else {
          setErrorEmail(false)
          return true
        }
      }
    }
  }
  const validarPass = () => {
    if (pass === '') {
      setErrorPass(undefined)
      return false
    } else if (pass.length < 8) {
      setErrorPass(true)
      return false
    } else {
      setErrorPass(false)
      return true
    }
  }
  const nombreInvalido = errorNombre === true ? 'is-invalid' : "";
  const nombreValido = errorNombre === false ? 'is-valid' : "";
  const emailInvalido = errorEmail === true ? 'is-invalid' : "";
  const emailValido = errorEmail === false ? 'is-valid' : "";
  const passInvalido = errorPass === true ? 'is-invalid' : "";
  const passValido = errorPass === false ? 'is-valid' : "";

  useEffect(() => {
    setTimeout(() => {
      recibirUsuarios();
    }, 1300)
  }, []);

  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      sendEmail()
    }
  }, [code]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setNombre("");
      setPass("");
      setEmail("");
    }
  }, [sent]);

  return (
    <div className="container my-5 bajar-footer d-flex flex-column justify-content-center">
      <h2 className="my-4 text-center font-weight-light">
        Empezá creando tu cuenta
      </h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group>
          {error === true ? (
            <Alert className='small text-center'>Todos los campos son obligatorios</Alert>
          ) : null}
          <Form.Label>Tu nombre de usuario</Form.Label>
          <Form.Control
            className={`${nombreValido} ${nombreInvalido}`}
            onChange={(e) => setNombre(e.target.value)}
            onKeyUp={() => validarNombre()}
            type="text"
            placeholder="Jorgito"
            value={nombre}
          />
          {errorNombre === true ? (
            <Alert className='small text-center' >Usuario en uso</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Tu email</Form.Label>
          <Form.Control
            className={`${emailInvalido}`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={() => validarEmail()}
            type="email"
            placeholder="jorge@jpclub.com"
            value={email}
          />
          {errorEmail === true ? (
            <Alert className='small text-center' >Email en uso</Alert>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Contraseña</Form.Label>
          <Form.Control
            className={`${passInvalido} ${passValido}`}
            onChange={(e) => setPass(e.target.value)}
            onKeyUp={() => validarPass()}
            type="password"
            placeholder="Contraseña"
            value={pass}
          />
          {errorPass === true ? (
            <Alert className='small text-center' >Tu contraseña debe tener al menos 8 caracteres</Alert>
          ) : null}
          {errorPass === false ? (
            <Alert className='small text-center' >¡Se ve segura!</Alert>
          ) : null}
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <a className="text-muted text-decoration-none">
            ¿Ya tenés una cuenta?{" "}
            <Link exact={true} to="/ingresar" onClick={props.toggleScrollBottom} className="text-decoration-none azul">
              Inicia sesion
            </Link>
          </a>
        </div>
        <div className="d-flex justify-content-center">
          <Button className="boton" type="submit">
            Registrate
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default withRouter(Sub);
