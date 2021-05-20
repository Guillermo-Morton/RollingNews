import React from "react";
import { Table } from "react-bootstrap";
import NoticiaIndividual from "./NoticiaIndividual";

const ListarNoticias = (props) => {
  return (
    <div className="container">
      <h2 className="font-weight-light my-2">Lista de noticias</h2>
      <Table className="my-4" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Subtítulo</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
         {
           props.noticias.map((noticia)=> <NoticiaIndividual consultarAPI={props.consultarAPI} noticia={noticia} key={noticia.id}></NoticiaIndividual>)
         }  
        </tbody>
      </Table>
    </div>
  );
};

export default ListarNoticias;
