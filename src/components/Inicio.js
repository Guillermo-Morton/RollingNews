import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ElTiempo from "./apis/ElTiempo";

const Inicio = (props) => {
  // state

  // consigue 2 categorias aleatorias para mostrar como recomendadas
  const[recomendadas, setRecomendadas]=useState([])
  // contiene 6 noticias aleatorias para mostrar en la seccion de 'mas noticias'
  const [masNoticias, setMasNoticias] = useState([]);
  // consigue la ultima noticia agregada
  const destacada = props.noticias[0];

  useEffect(()=>{
    props.noticiasRandom(props.noticias.length-1,2,10,props.noticias,setRecomendadas)
    props.noticiasRandom(props.noticias.length-1,6,20,props.noticias,setMasNoticias)
  },[props.noticias])

  return (
    <div className="container">
      <section className="my-3">
        <h2 className="mt-5">LO MÁS BUSCADO</h2>
        <div className="row">
          <Link
            key={destacada && destacada.id}
            exact={true}
            to={`/detalle/${destacada && destacada.id}`}
            className="col-lg-6 text-decoration-none text-dark"
          >
            <img
              src={destacada && destacada.imagen1}
              className="bg-secondary w-100 div-imagen-grande mb-2"
            ></img>
            <h4>{destacada && destacada.titulo}</h4>
            <p>{destacada && destacada.subtitulo}</p>
          </Link>
          <div className="col-lg-3">
              {recomendadas.map((noticia) => (
                <Link
                  key={noticia && noticia.id}
                  exact="true"
                  to={`/detalle/${noticia && noticia.id}`}
                  className="noticias-chicas  text-decoration-none text-dark"
                >
                  <img
                    className="w-100 mb-2 div-imagen-chica"
                    src={noticia && noticia.imagen1}
                    alt=""
                  />
                  <h6>{noticia && noticia.titulo}</h6>
                </Link>
              ))}
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section className="my-3">
        <h2 className="mt-5">COVID</h2>
        <div className="d-flex flex-wrap my-5">
          {props.covid.map((noticia) => (
            <Link
              key={noticia && noticia.id}
              exact="true"
              to={`/detalle/${noticia && noticia.id}`}
              className="px-2 noticias-medianas text-dark text-decoration-none"
            >
              {/* <div className="bg-secondary w-100 div-imagen-grande mb-2"></div> */}
              <img
                className="w-100 mb-2 div-imagen-grande"
                src={noticia && noticia.imagen1}
                alt=""
              />
              <h6>{noticia && noticia.titulo}</h6>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-3">
        <h2 className="mt-5">MÁS NOTICIAS</h2>
        <div className="row">
          <div className="col-lg-9">
            <div className="d-flex flex-wrap">
              {masNoticias.map((noticia) => (
                <Link
                  key={noticia && noticia.id}
                  exact="true"
                  to={`/detalle/${noticia && noticia.id}`}
                  className="noticias-chicas px-2 text-decoration-none text-dark"
                >
                  <img
                    className="w-100 mb-2 div-imagen-chica"
                    src={noticia && noticia.imagen1}
                    alt=""
                  />
                  <h6>{noticia && noticia.titulo}</h6>
                </Link>
              ))}
            </div>
            <ElTiempo>
              
            </ElTiempo>
        
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mt-5">CRIPTOMONEDAS</h2>
        <div className="bg-secondary w-100 div-clima mb-2"></div>
      </section>
    </div>
  );
};

export default Inicio;
