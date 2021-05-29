import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { withRouter} from "react-router";
import Swal from "sweetalert2";

const Verificar = (props) => {
  // URL
  const URL3 = process.env.REACT_APP_API_URL3;

  // States
  const [code, setCode] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  const [verified, setVerified] = useState(false);

  const id = code;
  // funcione para obtener el codigo del usuario recien creado
  const codigoUsuario = async () => {
    try {
      const consulta = await fetch(URL3);
      const respuesta = await consulta.json();
      const usuarioFiltrado = respuesta.filter(
        (user) => user.id === code && user.nombre === userName
      );
      setUser(usuarioFiltrado[0]);
      if(usuarioFiltrado[0].id === code){
        setVerified(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verificar = async () => {
    //   datos modificados
    if(verified){
        const usuarioVerificado = {
            nombre: user.nombre,
            pass: user.pass,
            verified: verified,
            email: user.email,
          };
          try {
            const respuesta = await fetch(URL3 + "/" + id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(usuarioVerificado),
            });
            if (respuesta.status === 200) {
              Swal.fire(
                "Usuario verificado",
                "Ahora podés disfrutar de todos los beneficios",
                "success"
              );
              // redireccionamos a la pagina de inicio
              props.history.push("/");
            }
          } catch (error) {
            console.log(error);
          }
    }
    
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
        codigoUsuario();
    }
  },[code]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
        verificar()
    }
  },[verified]);

  return (
    <div className="container">
      <Form>
        <Form.Group>
          <Form.Label className="mt-4">Ingresá tu nombre de usuario</Form.Label>
          <Form.Control
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Tu usuario"
            value={userName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-4">Ingresá tu código único</Form.Label>
          <Form.Control
            onChange={(e) => setCode(e.target.value)}
            type="text"
            placeholder="Tu código"
            value={code}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default withRouter(Verificar);
