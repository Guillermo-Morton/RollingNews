import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/common/Footer";
import NavB from "./components/common/NavB";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import SeccionCategoria from "./components/categorias/SeccionCategoria";
import DetalleNoticia from "./components/categorias/DetalleNoticia";
import Ingreso from "./components/cuentas/Ingreso";
import Administración from "./components/administracion/Administración";
import NuevaNoticia from "./components/administracion/NuevaNoticia";
import ListarCategorias from "./components/administracion/tablaCategoria/ListarCategorias";
import ListarNoticias from "./components/administracion/tablaNoticias/ListarNoticias";
import EditarNoticia from "./components/administracion/EditarNoticia";
import Sub from "./components/cuentas/Sub";
import { Button } from "react-bootstrap";
import Verificar from "./components/cuentas/Verificar";
import Sidebar from "./components/common/sidebar/Sidebar";

function App() {
  const URL = process.env.REACT_APP_API_URL;
  const URL2 = process.env.REACT_APP_API_URL2;

  // creamos los states

  // contiene todaas las noticias del sitio
  const [noticias, setNoticias] = useState([]);
  // contiene las categorias disponibles
  const [categorias, setCategorias] = useState([]);
  // contiene las categorias que se muestran en el navbar
  const [navegacion, setNavegacion] = useState([]);
  // contiene las categorias que se muestran en el menu dropdown del navba
  const [dropdown, setDropdown] = useState([]);
  // contiene 2 noticias de la categoria Covid
  const [covid, setCovid] = useState([]);
  // contiene una lista de noticias excluyendo a las de la categoria covid
  const [noticiasInicio, setNoticiasInicio] = useState([]);

  // aqui van nuestros useEffect
  useEffect(() => {
    consultarAPI();
    consultarCategoria();
  }, []);

  useEffect(() => {
    categoriasNavbar();
  }, [categorias]);

  // funcion pickRamdom para obtener 6 noticias aleatorias
  const noticiasRandom = (max, numbers, presition, array, state) => {
    // const max = noticias.length - 1;
    const _indexNoticias = [];
    const _masNoticias = [];
    let result = [];
    for (let i = 0; i < presition; i++) {
      const resultado = Math.floor(Math.random() * (max - 1)) + 1;
      _indexNoticias.push(resultado);
      result = _indexNoticias.filter((item, index) => {
        return _indexNoticias.indexOf(item) === index;
      });
    }
    result.splice(numbers, result.length);
    for (let i in result) {
      _masNoticias.push(array[result[i]]);
    }
    state(_masNoticias);
  };

  // funcion para manejar los datos de las categorias en el navbar
  const categoriasNavbar = () => {
    const categoriasNavegacion = [];
    const categoriasDropdown = [];
    for (let i = 0; i < 4; i++) {
      categoriasNavegacion.push(categorias[i]);
    }
    setNavegacion(categoriasNavegacion);

    for (let i = 4; i < categorias.length; i++) {
      categoriasDropdown.push(categorias[i]);
    }
    setDropdown(categoriasDropdown);
  };

  // funciones para consultar a la api
  const consultarAPI = async () => {
    try {
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      setNoticias(respuesta.reverse());
      // lista de noticias sin las noticias sobre covid
      const _noticiasInicio = respuesta.filter(
        (noticia) => noticia.categoria != "Covid"
      );
      setNoticiasInicio(_noticiasInicio);
      // noticias para la seccion covid
      const _covid = respuesta.filter(
        (noticia) => noticia.categoria === "Covid"
      );
      _covid.splice(2, _covid.length);
      setCovid(_covid);
    } catch (error) {
      console.log(error);
    }
  };
  const consultarCategoria = async () => {
    try {
      const consulta = await fetch(URL2);
      const respuesta = await consulta.json();
      setCategorias(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  const extraerLocal = (key, state) => {
    let arr = [];
    if (localStorage.getItem(key) === null) {
      // no existe la key alertar sobre usuario incorrecto
      console.log("no existe key");
    } else {
      // si existe la key
      // este array recibe los datos del usuario logueado
      arr = JSON.parse(localStorage.getItem(key));
      state(arr);
    }
  };
  let noticiasVistas = 0;
  const limiteNoticias = () => {
    if (localStorage.getItem("noticiasVistasKey") === null) {
      // no existe la key
      noticiasVistas = 0;
      localStorage.setItem("noticiasVistasKey", JSON.stringify(noticiasVistas));
      console.log("no existe key");
    } else {
      // si existe la key
      // esta variable recibe los datos del usuario logueado
      noticiasVistas = JSON.parse(localStorage.getItem("noticiasVistasKey"));
    }
    noticiasVistas++;
    localStorage.setItem("noticiasVistasKey", JSON.stringify(noticiasVistas));
    console.log(noticiasVistas);
  };

  return (
    <div className="text-dark">
      <Router>
        <NavB
          dropdown={dropdown}
          navegacion={navegacion}
          noticias={noticias}
          extraerLocal={extraerLocal}
          categorias={categorias}
        ></NavB>
        <Switch>
          <Route exact path="/">
            <Inicio
              limiteNoticias={limiteNoticias}
              noticiasRandom={noticiasRandom}
              noticias={noticiasInicio}
              covid={covid}
            ></Inicio>
          </Route>
          <Route exact path="/categoria/:id">
            <SeccionCategoria
              limiteNoticias={limiteNoticias}
            ></SeccionCategoria>
          </Route>
          <Route exact path="/detalle/:id">
            <DetalleNoticia
              noticiasRandom={noticiasRandom}
              limiteNoticias={limiteNoticias}
              extraerLocal={extraerLocal}
            ></DetalleNoticia>
          </Route>
          <Route exact path="/ingresar">
            <Ingreso></Ingreso>
          </Route>
          <Route exact path="/suscribirse">
            <Sub></Sub>
          </Route>
          <Route exact path="/suscribirse/verificar">
            <Verificar></Verificar>
          </Route>
          <Route exact path="/administracion">
            <Administración extraerLocal={extraerLocal}></Administración>
          </Route>
          <Route exact path="/administracion/nueva">
            <NuevaNoticia
              extraerLocal={extraerLocal}
              categorias={categorias}
              consultarAPI={consultarAPI}
            ></NuevaNoticia>
          </Route>
          <Route exact path="/administracion/editar/:id">
            <EditarNoticia
              extraerLocal={extraerLocal}
              categorias={categorias}
              consultarAPI={consultarAPI}
            ></EditarNoticia>
          </Route>
          <Route exact path="/administracion/categorias">
            <ListarCategorias
              extraerLocal={extraerLocal}
              consultarCategoria={consultarCategoria}
              categorias={categorias}
            ></ListarCategorias>
          </Route>
          <Route exact path="/administracion/noticias">
            <ListarNoticias
              extraerLocal={extraerLocal}
              consultarAPI={consultarAPI}
              noticias={noticias}
            ></ListarNoticias>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
