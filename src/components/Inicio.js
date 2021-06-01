import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ElTiempo from "./apis/ElTiempo";

const Inicio = (props) => {
  // state

  // consigue 2 categorias aleatorias para mostrar como recomendadas
  const [recomendadas, setRecomendadas] = useState([]);
  // contiene 6 noticias aleatorias para mostrar en la seccion de 'mas noticias'
  const [masNoticias, setMasNoticias] = useState([]);
  // consigue la ultima noticia agregada
  const destacada = props.noticias[0];
  // contador de noticias vistas
  let noticiasVistas = 0;

  useEffect(() => {
    props.noticiasRandom(
      props.noticias.length - 1,
      2,
      10,
      props.noticias,
      setRecomendadas
    );
    props.noticiasRandom(
      props.noticias.length - 1,
      6,
      20,
      props.noticias,
      setMasNoticias
    );
  }, [props.noticias]);

  return (
    <div className="container">
      <section className="my-3">
        <h2 className="mt-5">LO MÁS BUSCADO</h2>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="d-flex">
              <Link
                onClick={props.limiteNoticias}
                onClick={props.toggleScroll}
                key={destacada && destacada._id}
                exact={true}
                to={`/detalle/${destacada && destacada._id}`}
                className="text-decoration-none text-dark mb-4 px-2"
              >
                <img
                  src={destacada && destacada.imagen1}
                  className="bg-secondary w-100 noticia-imagen "
                ></img>
                <div className="destacada-titulo  p-3">
                  <div>
                    <h4>{destacada && destacada.titulo}</h4>
                    <p>{destacada && destacada.subtitulo}</p>
                  </div>
                  <p>{destacada && destacada.categoria}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="d-flex flex-wrap">
              {recomendadas.map((noticia) => (
                <Link
                  onClick={props.limiteNoticias}
                  onClick={props.toggleScroll}
                  key={noticia && noticia._id}
                  exact="true"
                  to={`/detalle/${noticia && noticia._id}`}
                  className="text-decoration-none text-dark mb-4 noticias-recomendadas px-2"
                >
                  <img
                    className="w-100 h-50 noticia-imagen"
                    src={noticia && noticia.imagen1}
                    alt=""
                  />
                  <div className="recomendada-titulo h-50 px-3 py-2">
                    <h6>{noticia && noticia.titulo}</h6>
                    <p>{noticia && noticia.categoria}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <hr></hr>
      <section className="my-3">
        <h2 className="mt-5">COVID</h2>
        <div className="d-flex flex-wrap">
          <img
            className="w-100 mb-4"
            src="https://www.redcross.org/content/dam/redcross/cruz-roja/news-articles/coronavirus_spanish.png.transform/1288/q70/feature/image.png"
            alt=""
          />
          {props.covid.map((noticia) => (
            <Link
              onClick={props.limiteNoticias}
              onClick={props.toggleScroll}
              key={noticia && noticia._id}
              exact="true"
              to={`/detalle/${noticia && noticia._id}`}
              className="noticias-medianas text-dark px-2 mb-4 text-decoration-none"
            >
              <img
                className="w-100 noticia-imagen div-imagen-grande"
                src={noticia && noticia.imagen1}
                alt=""
              />
              <h6 className="destacada-titulo h-25 p-3">
                {noticia && noticia.titulo}
              </h6>
            </Link>
          ))}
        </div>
      </section>
      <hr></hr>
      <section className="my-3">
        <h2 className="mt-5">MÁS NOTICIAS</h2>
        <div className="row">
          <div className="col-lg-10 col-sm-12 col-md-10">
            <div className="contenedor-noticias-chicas">
              {masNoticias.map((noticia) => (
                <Link
                  onClick={props.limiteNoticias}
                  onClick={props.toggleScroll}
                  key={noticia && noticia._id}
                  exact="true"
                  to={`/detalle/${noticia && noticia._id}`}
                  className="noticias-chicas px-2 my-2 text-decoration-none text-dark d-flex flex-column"
                >
                  <img
                    className="w-100 h-50 noticia-imagen"
                    src={noticia && noticia.imagen1}
                    alt=""
                  />
                  <div className="noticia-titulo px-3 py-2 d-flex flex-column justify-content-between">
                    <h6>{noticia && noticia.titulo}</h6>
                    <p>{noticia && noticia.categoria}</p>
                  </div>
                </Link>
              ))}
            </div>
            <ElTiempo></ElTiempo>
          </div>
        </div>
      </section>
      <hr></hr>
      <section>
        <h2 className="mt-5">CRIPTOMONEDAS</h2>
        <div className="bg-secondary w-100 div-clima mb-2"></div>
      </section>
    </div>
  );
};

export default Inicio;
