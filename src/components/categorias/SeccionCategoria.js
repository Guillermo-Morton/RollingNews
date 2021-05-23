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
  // states de secciones
  const [destacada, setDestacada] = useState({});
  const [noticiaSm, setNoticiaSm] = useState([]);
  const [noticiaMd, setNoticiaMd] = useState([]);
  const [masNoticias, setMasNoticias] = useState([]);
  // consultamos la categoria
  const consultarCategoria = async () => {
    try {
      const respuesta = await fetch(URL2 + `/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setCategoria(resultado.categoriaDisponible);
        console.log(resultado.categoriaDisponible);
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
      // Aqui se filtran las noticias
      const noticiasFiltradas = respuesta.filter(
        (noticia) => noticia.categoria === categoria
      );
      setNoticias(noticiasFiltradas);
    } catch (error) {
      console.log(error);
    }
  };
  const secciones = () => {
    // Destacada
    setDestacada(noticias[noticias.length - 1]);
    // Noticias chicas
    const _noticiaSm = [];
    for (let i = 0; i < 6; i++) {
      _noticiaSm.push(noticias[i]);
      _noticiaSm.reverse();
    }
    setNoticiaSm(_noticiaSm);
    // Noticias Medianas
    const _noticiaMd = [];
    for (let i = 6; i < 8; i++) {
      _noticiaMd.push(noticias[i]);
      _noticiaMd.reverse();
    }
    setNoticiaMd(_noticiaMd);
  };
  // Traer los datos del objeto
  useEffect(() => {
    consultarCategoria();
  }, [id]);
  useEffect(() => {
    consultarAPI();
  }, [categoria]);
  useEffect(() => {
    secciones();
  }, [noticias]);
  return (
    <div className="container">
      <h2 className="mt-5">{categoria}</h2>
      <section>
        <div className="row">
          <div className="col-lg-9">
            <div className="row my-2">
              <div className="col-lg-12 mb-5">
                <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
                <h4>{destacada && destacada.titulo}</h4>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              {noticiaSm.map((noticia) => (
                <div className="noticias-chicas px-2">
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>{noticia && noticia.titulo}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex flex-wrap my-5">
          {noticiaMd.map((noticia) => (
            <div className="px-2 noticias-medianas">
              <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
              <h6>
              {noticia && noticia.titulo}
              </h6>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="row mt-5">
          <div className="col-lg-9">
          <div className="d-flex flex-wrap">
              {noticiaSm.map((noticia) => (
                <div className="noticias-chicas px-2">
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>{noticia && noticia.titulo}</h6>
                </div>
              ))}
            </div>
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
