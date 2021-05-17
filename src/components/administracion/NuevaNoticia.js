import React from "react";
import { Button, Form } from "react-bootstrap";

const NuevaNoticia = () => {
  return (
    <div className="container">
      <h2 className="font-weight-light my-3 text-center">
        AGREGAR UNA NUEVA NOTICIA
      </h2>
      <Form>
        <Form.Group controlId="titulo">
          <Form.Label>Título principal</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="titulo">
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="titulo">
          <Form.Label>Archivo imagen 1</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="titulo">
          <Form.Label>Archivo imagen 2</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="p1">
          <Form.Label>Párrafo 1</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group controlId="p2">
          <Form.Label>Párrafo 2</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group controlId="p3">
          <Form.Label>Párrafo 3</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group controlId="categoria">
          <Form.Label>Seleccionar categoría</Form.Label>
          <Form.Control as="select" multiple>
            <option>Espectáculos</option>
            <option>Tecnología</option>
            <option>Deportes</option>
            <option>Política</option>
            <option>Economía</option>
            <option>Salud</option>
            <option>Fotografía</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar
        </Button>
      </Form>
    </div>
  );
};

export default NuevaNoticia;
