import React, { useState, useEffect, Fragment } from "react";
import { useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
const DetalleNoticia = (props) => {
  const URL = process.env.REACT_APP_API_URL;
  // obtengo el parametro de la URL
  const { id } = useParams();
  // declaramos los states
  const [noticia, setNoticia] = useState({});
  const [categoria, setCategoria] = useState("");
  const [otrasNoticias, setOtrasNoticias] = useState([]);
  const [noticiasAlAzar, setNoticiasAlAzar] = useState([]);
  const [recomendadas, setRecomendadas] = useState([]);
  const [masSobre, setMasSobre] = useState([]);
  // contador de noticias vistas
  const [usuarioLog, setUsuarioLog] = useState({});
  const [contador, setContador] = useState(0);
  let noticiasVistas = 0;
  // consultamos la noticia seleccionada
  const consultarNoticia = async () => {
    try {
      const respuesta = await fetch(URL + `/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setNoticia(resultado);
        setCategoria(resultado.categoria.toUpperCase());
      }
    } catch (error) {
      console.log(error);
    }
  };
  // obtenemos las noticias de la misma categoria
  const consultarNoticias = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      // lista de noticias sin las noticias sobre covid
      const _otrasNoticias = respuesta.filter(
        (noticia) => noticia && noticia.categoria.toUpperCase() === categoria
      );
      setOtrasNoticias(_otrasNoticias);
    } catch (error) {
      console.log(error);
    }
  };
  const filtrarRecomendadas = () => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr.push(noticiasAlAzar[i]);
      setRecomendadas(arr);
    }
    const arr2 = [];
    for (let i = 2; i < 8; i++) {
      arr2.push(noticiasAlAzar[i]);
      setMasSobre(arr2);
    }
  };
  useEffect(() => {
    consultarNoticia();
  }, [id]);
  useEffect(() => {
    consultarNoticias();
  }, [categoria]);
  useEffect(() => {
    props.noticiasRandom(
      otrasNoticias.length - 1,
      8,
      40,
      otrasNoticias,
      setNoticiasAlAzar
    );
  }, [otrasNoticias, id]);
  useEffect(() => {
    filtrarRecomendadas();
  }, [noticiasAlAzar]);
  // useEffect que actua cuando cambia la URL
  const location = useLocation();
  useEffect(() => {
    console.log("route has been changed");
    props.extraerLocal("noticiasVistasKey", setContador);
    props.extraerLocal("usuarioLogueadoKey", setUsuarioLog);
    if(usuarioLog.nombre!=undefined){
      localStorage.setItem("noticiasVistasKey", JSON.stringify(noticiasVistas));
    }
  }, [location.pathname]);
  //   renderiza los componentes segun la cantidad de noticias leidas
  const permitirVisualizacion =
  usuarioLog.nombre!=undefined || contador<20 ? (
      <Fragment>
        <h2 className="mt-5">{noticia.titulo}</h2>
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-12">
                <section>
                  <img
                    src={noticia.imagen1}
                    className="bg-secondary w-100  mb-2"
                  ></img>
                  <h5>{noticia.subtitulo}</h5>
                  <p>{noticia.parrafo1}</p>
                  <p>{noticia.parrafo2}</p>
                </section>

                <section>
                  <img
                    src={noticia.imagen2}
                    className="bg-secondary w-100  mb-2"
                  ></img>
                  <p>{noticia.parrafo3}</p>
                </section>
                <h2 className="mt-5">MÁS SOBRE {categoria}</h2>
                <section className="d-flex flex-wrap">
                  {masSobre.map((noticia) => (
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
                </section>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {recomendadas.map((noticia) => (
              <Link
                onClick={props.limiteNoticias}
                key={noticia && noticia._id}
                exact="true"
                to={`/detalle/${noticia && noticia._id}`}
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
            <div className="bg-secondary w-75 div-anuncio2 ml-auto mt-4"></div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className='text-center'>
        <h1 className="display-2">Alcanzaste el limite de noticias por leer</h1>
        <p className="lead">
          Ingresa a tu cuenta, o crea una de forma gratuita
        </p>
        </div>
     
      </Fragment>
    );

  return (
    <div className="container text-muted">
      {permitirVisualizacion}
    </div>
  );
};

export default DetalleNoticia;
