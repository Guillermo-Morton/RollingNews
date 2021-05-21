import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router";

const SeccionCategoria = () => {
  const URL = process.env.REACT_APP_API_URL;
  const URL2 = process.env.REACT_APP_API_URL2;
  // obtengo el parametro de la URL
  const { id } = useParams();
  // declaramos los states
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState("");
  // consultamos la categoria
  const consultarCategoria = async () => {
    try {
      const respuesta = await fetch(URL2 + `/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setCategoria(resultado.categoriaDisponible);
        console.log(categoria);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Filtrar las noticias segun su categoría
  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      const noticiasFiltradas = respuesta.filter(
        (noticia) => noticia.categoria === categoria
      );
      setNoticias(noticiasFiltradas);
    } catch (error) {
      console.log(error);
    }
  };

  // Traer los datos del objeto
  useEffect(() => {
    consultarCategoria();
    consultarAPI();
  }, [id, categoria]);
  return (
    <div className="container">
      <h2 className="mt-5">{categoria}</h2>
      <section>
        <div className="row">
          <div className="col-lg-9">
            <div className="row my-2">
              <div className="col-lg-12 mb-5">
                <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
                {noticias.map((noticia) => (
                  <h4 key={noticia.id}>{noticia.titulo}</h4>
                ))}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
              </div>
              <div className="col-lg-4">
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
              </div>
              <div className="col-lg-4">
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
                <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                <h6>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, iste odit!
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
          <div className="col-lg-6">
            <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
        </div>
      </section>

      <section>
        <div className="row mt-5">
          <div className="col-lg-3">
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeccionCategoria;
