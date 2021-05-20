import React from "react";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

const CategoriaIndividual = (props) => {
  const eliminarCategoria = (id) => {
    const URL2 = process.env.REACT_APP_API_URL2 + "/" + id;
    Swal.fire({
      title: "¿Estas seguro de eliminar esta cateogoria?",
      text: "No puede recuperar datos eliminados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // se agrega codigo para eliminar la noticia de la api
        try {
          // con el metodo DELETE no hace falta el body
          const response = await fetch(URL2, {
            method: "DELETE",
            headers: {
              "Content-Type": "aplication/json",
            },
          });
          // consultamos la api para recargar los productos

          if (response.status === 200) {
            // mostrar el cartel de producto eliminado
            Swal.fire(
              "Categoria removida",
              "La noticia seleccionada se eliminó correctamente",
              "success"
            );
            // actualizar datos
            props.consultarCategoria();
          } else {
            Swal.fire("Error", "Intente nuevamente", "error");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Espere unos minutos", "error");
        }
      }
    });
  };
  return (
    <tr>
      <td>{props.categoria.id}</td>
      <td className="w-100">{props.categoria.categoriaDisponible}</td>
      <td>
        <button onClick={() => eliminarCategoria(props.categoria.id)} className="mx-auto d-block btn btn-danger py-1">
          <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};

export default CategoriaIndividual;
