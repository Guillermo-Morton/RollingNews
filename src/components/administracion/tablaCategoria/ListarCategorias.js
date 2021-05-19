import React from "react";
import { Table } from "react-bootstrap";
import NuevaCategoria from "../NuevaCategoria";
import CategoriaIndividual from "./CategoriaIndividual";

const ListarCategorias = (props) => {
  return (
    <div className="container">
      <h2 className="font-weight-light mt-2 mb-3">Lista de noticias</h2>
      <NuevaCategoria consultarCategoria={props.consultarCategoria}></NuevaCategoria>
      <Table className="my-4 mx-auto" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {
           props.categorias.map((categoria)=> <CategoriaIndividual consultarCategoria={props.consultarCategoria} categoria={categoria} key={categoria.id}></CategoriaIndividual>)
         }  
        </tbody>
      </Table>
    </div>
  );
};

export default ListarCategorias;
