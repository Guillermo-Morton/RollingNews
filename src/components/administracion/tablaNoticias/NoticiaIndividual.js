import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Button } from "bootstrap";
import React from "react";

const NoticiaIndividual = (props) => {
//   const eliminarNoticia = (id) => {
//     const URL = process.env.REACT_APP_API_URL + "/" + id;

//     console.log(URL);

//     Swal.fire({
//       title: "¿Estas seguro de eliminar esta noticia?",
//       text: "No puede recuperar datos eliminados!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Eliminar",
//       cancelButtonText: "Cancelar",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // se agrega codigo para eliminar la noticia de la api
//         try {
//           // con el metodo DELETE no hace falta el body
//           const response = await fetch(URL, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "aplication/json",
//             },
//           });
//           // consultamos la api para recargar los productos

//           if (response.status === 200) {
//             // mostrar el cartel de producto eliminado
//             Swal.fire(
//               "Noticia removida",
//               "La noticia seleccionada se eliminó correctamente",
//               "success"
//             );
//             // actualizar datos
//             props.consultarAPI();
//           } else {
//             Swal.fire("Error", "Intente nuevamente", "error");
//           }
//           console.log(response);
//         } catch (error) {
//           console.log(error);
//           Swal.fire("Error", "Espere unos minutos", "error");
//         }
//       }
//     });
//   };

  return (
      
    <tr>
      <td>{props.noticia.id}</td>
      <td>{props.noticia.titulo}</td>
      <td>{props.noticia.subtitulo}</td>
      <td>{props.noticia.categoria}</td>
      {/* <button className='btn btn-danger' onClick={()=>eliminarNoticia(props.producto.id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button> */}
    </tr>
  );
};
export default NoticiaIndividual;