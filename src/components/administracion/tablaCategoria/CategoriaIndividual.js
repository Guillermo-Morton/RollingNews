import React from 'react';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoriaIndividual = (props) => {
    return (
        <tr>
        <td>{props.categoria.id}</td>
        <td className='w-100'>{props.categoria.categoriaDisponible}</td>
        <td >
          <button className="mx-auto d-block btn btn-danger py-1">
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </button>
        </td>
      </tr>
    );
};

export default CategoriaIndividual;