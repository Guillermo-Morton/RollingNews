import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PantallaCategorias from "../helpers/pantallas/PantallaCategorias";

const SeccionCategoria = (props) => {
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
  const [noticiasOtrasCategorias, setNoticiasOtrasCategorias] = useState([]);

  // contador de noticias vistas
  let noticiasVistas = 0;

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
      const noticiasOtraCategoria = respuesta.filter(
        (noticia) => noticia.categoria != categoria
      );
      setNoticias(noticiasFiltradas.reverse());
      setNoticiasOtrasCategorias(noticiasOtraCategoria.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const secciones = () => {
    // Destacada
    setDestacada(noticias[0]);

    // Noticias chicas
    const _noticiaSm = [];
    for (let i = 1; i < 7; i++) {
      _noticiaSm.push(noticias[i]);
    }
    setNoticiaSm(_noticiaSm);

    // Noticias Medianas
    const _noticiaMd = [];
    for (let i = 7; i < 9; i++) {
      _noticiaMd.push(noticias[i]);
    }
    setNoticiaMd(_noticiaMd);

    // Otras noticias
  };
  // funcion para obtener 6 noticias al azar de otras categorias
  const otrasNoticias = () => {
    const max = noticiasOtrasCategorias.length - 1;
    const _indexNoticias = [];
    const _masNoticias = [];
    let result = [];
    for (let i = 0; i < 12; i++) {
      const resultado = Math.floor(Math.random() * (max - 1)) + 1;
      _indexNoticias.push(resultado);
      result = _indexNoticias.filter((item, index) => {
        return _indexNoticias.indexOf(item) === index;
      });
    }
    result.splice(6, result.length - 6);
    for (let i in result) {
      _masNoticias.push(noticiasOtrasCategorias[result[i]]);
    }
    setMasNoticias(_masNoticias);
  };

  useEffect(() => {
    consultarCategoria();
  }, [id]);
  useEffect(() => {
    consultarAPI();
  }, [categoria]);
  useEffect(() => {
    secciones();
  }, [noticias]);
  useEffect(() => {
    otrasNoticias();
  }, [noticiasOtrasCategorias]);
  // pantalla de carga
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setCargado(false)
    fetch("https://rollingnews5a.herokuapp.com/api/rollingnews/noticias").then(
      (response) =>
        response.json().then(() => {
          setTimeout(() => {
            setCargado(true);
            console.log("cargada");
          }, 500);
        })
    );
  }, [categoria]);

  const mostrarCarga = cargado === true ? "" : "d-none";
  const ocultarCarga = cargado === false ? "" : "d-none";
  return (
    <div className="container">
      <div className={ocultarCarga}>
        <PantallaCategorias categoria={categoria}></PantallaCategorias>
      </div>
      <div className={mostrarCarga}>
        <section className="my-5">
          <h2 className="mb-3 px-2">{categoria.toUpperCase()}</h2>
          <div className="row">
            <div className="col-lg-10 col-sm-12"></div>
            <div className="px-2 ">
              <Link
                onClick={props.limiteNoticias}
                onClick={props.toggleScroll}
                key={destacada && destacada._id}
                exact="true"
                to={`/detalle/${destacada && destacada._id}`}
                className="w-100  text-dark text-decoration-none"
              >
                <img
                  className="w-100 noticia-imagen"
                  src={destacada && destacada.imagen1}
                  alt=""
                />
                <h4 className="destacada-titulo p-3">
                  {destacada && destacada.titulo}
                </h4>
              </Link>
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="mb-5 mt-4">
          <div className="row">
            <div className="col-lg-10 col-sm-12">
              <div className="contenedor-noticias-chicas">
                {noticiaSm.map((noticia) => (
                  <Link
                    key={noticia && noticia._id}
                    onClick={props.toggleScroll}
                    exact={true}
                    to={`/detalle/${noticia && noticia._id}`}
                    className="noticias-chicas px-2 mt-4  text-decoration-none text-dark d-flex flex-column"
                  >
                    <img
                      className="w-100 h-50 noticia-imagen"
                      src={noticia && noticia.imagen1}
                      alt=""
                    />
                    <div className="noticia-titulo px-3 py-2  d-flex flex-column">
                      <h6>{noticia && noticia.titulo}</h6>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-lg-2">
              <div className="bg-secondary w-100 div-anuncio ml-auto"></div>
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="my-5">
          <div className="d-flex flex-wrap">
            {noticiaMd.map((noticia) => (
              <Link
                onClick={props.limiteNoticias}
                onClick={props.toggleScroll}
                key={noticia && noticia._id}
                exact="true"
                to={`/detalle/${noticia && noticia._id}`}
                className="px-2 noticias-medianas text-dark text-decoration-none"
              >
                <img
                  className="w-100 mb-2 noticia-imagen div-imagen-grande"
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

        <section>
          <h2>OTRAS NOTICIAS</h2>
          <div className="row mt-5">
            <div className="col-lg-10">
              <div className="contenedor-noticias-chicas">
                {masNoticias.map((noticia) => (
                  <Link
                    onClick={props.limiteNoticias}
                    onClick={props.toggleScroll}
                    key={noticia && noticia._id}
                    exact={true}
                    to={`/detalle/${noticia && noticia._id}`}
                    className="noticias-chicas px-2 my-2 text-decoration-none text-dark d-flex flex-column"
                  >
                    <img
                      className="w-100 h-50 noticia-imagen"
                      src={noticia && noticia.imagen1}
                      alt=""
                    />
                    <div className="noticia-titulo px-3 py-2  d-flex flex-column justify-content-between">
                      <h6>{noticia && noticia.titulo}</h6>
                      <p>{noticia && noticia.categoria}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-lg-2">
              <div className="bg-secondary w-100 div-anuncio ml-auto"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeccionCategoria;
