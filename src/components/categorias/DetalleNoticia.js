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
    if (usuarioLog.nombre != undefined) {
      localStorage.setItem("noticiasVistasKey", JSON.stringify(noticiasVistas));
    }
  }, [location.pathname]);
  //   renderiza los componentes segun la cantidad de noticias leidas
  const permitirVisualizacion =
    usuarioLog.nombre != undefined || contador < 20 ? (
      <Fragment>
        <h2 className="mt-5">{noticia.titulo}</h2>
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="row">
              <div className="col-lg-12">
                <section>
                  <h4 className='my-4'>{noticia.subtitulo}</h4>
                  <img
                    src={noticia.imagen1}
                    className="bg-secondary w-100 mb-2 noticia-imagen"
                  ></img>
                  <p className='my-4'>{noticia.parrafo1}</p>
                  <p className='my-4'>{noticia.parrafo2}</p>
                </section>

                <section>
                  <img
                    src={noticia.imagen2}
                    className="bg-secondary w-100  mb-2"
                  ></img>
                  <p className='my-4'>{noticia.parrafo3}</p>
                </section>
                <hr></hr>
                <h2 className="mt-5">MÁS SOBRE {categoria}</h2>
                <section className="contenedor-noticias-chicas">
                  {masSobre.map((noticia) => (
                    <Link
                      onClick={props.limiteNoticias}
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
                </section>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 mt-5">
            {recomendadas.map((noticia) => (
              <Link
                onClick={props.limiteNoticias}
                key={noticia && noticia._id}
                exact="true"
                to={`/detalle/${noticia && noticia._id}`}
                className="noticias-chicas text-decoration-none mb-4 text-dark d"
              >
                <img
                  className="w-100 mb-2 div-imagen-chica noticia-imagen"
                  src={noticia && noticia.imagen1}
                  alt=""
                />
                <div className=" px-3 py-2 d-flex flex-column justify-content-between recomendada-titulo mb-4">
                  <h6>{noticia && noticia.titulo}</h6>
                  <p>{noticia && noticia.categoria}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="text-center">
          <h1 className="display-2">
            Alcanzaste el limite de noticias por leer
          </h1>
          <p className="lead">
            Ingresa a tu cuenta, o crea una de forma gratuita
          </p>
        </div>
      </Fragment>
    );

  return <div className="container">{permitirVisualizacion}</div>;
};

export default DetalleNoticia;
