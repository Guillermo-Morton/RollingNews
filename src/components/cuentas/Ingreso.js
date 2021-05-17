import React from "react";
import { Form, Button } from "react-bootstrap";

const Ingreso = () => {
  return (
    <div className="container my-5">
      <h2 className="my-4 text-center font-weight-light">
        Ingresá con tu cuenta
      </h2>
      <Form className="w-75 mx-auto">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label >Tu nombre de usuario</Form.Label>
          <Form.Control type="text" placeholder="Jorgito" />
          <Form.Label className='mt-4'>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>
        <div className='d-flex justify-content-center mb-3'>
          <a className="text-muted">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Inicia sesíon
          </Button>
          <Button className="mx-2" variant="outline-primary" type="submit">
            Suscríbete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Ingreso;
