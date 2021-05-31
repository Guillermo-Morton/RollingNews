import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
      // noticiasOtraCategoria.splice(6, noticiasOtraCategoria.length-6)
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
  return (
    <div className="container">
      <h2 className="mt-5">{categoria.toUpperCase()}</h2>
      <section>
        <div className="row">
          <div className="col-lg-9">
            <div className="my-2 px-2">
              <Link
                onClick={props.limiteNoticias}
                key={destacada && destacada._id}
                exact="true"
                to={`/detalle/${destacada && destacada._id}`}
                className="w-100 mb-5  text-dark text-decoration-none"
              >
                <img
                  className="w-100 mb-2"
                  src={destacada && destacada.imagen1}
                  alt=""
                />
                <h4>{destacada && destacada.titulo}</h4>
              </Link>
            </div>
            <div className="d-flex flex-wrap">
              {noticiaSm.map((noticia) => (
                <Link
                  onClick={props.limiteNoticias}
                  key={noticia && noticia._id}
                  exact="true"
                  to={`/detalle/${noticia && noticia._id}`}
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
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex flex-wrap my-5">
          {noticiaMd.map((noticia) => (
            <Link
              onClick={props.limiteNoticias}
              key={noticia && noticia._id}
              exact="true"
              to={`/detalle/${noticia && noticia._id}`}
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

      <section>
        <h2>OTRAS NOTICIAS</h2>
        <div className="row mt-5">
          <div className="col-lg-9">
            <div className="d-flex flex-wrap">
              {masNoticias.map((noticia) => (
                <Link
                  key={noticia && noticia._id}
                  exact={true}
                  to={`/detalle/${noticia && noticia._id}`}
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
