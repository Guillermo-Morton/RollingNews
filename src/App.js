import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/common/Footer";
import NavB from "./components/common/NavB";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import SeccionCategoria from "./components/categorias/SeccionCategoria";
import DetalleNoticia from "./components/DetalleNoticia";
import Ingreso from "./components/cuentas/Ingreso";
import Administración from "./components/administracion/Administración";
import NuevaNoticia from "./components/administracion/NuevaNoticia";
import ListarCategorias from "./components/administracion/tablaCategoria/ListarCategorias"
import ListarNoticias from "./components/administracion/tablaNoticias/ListarNoticias"

function App() {
  const URL = process.env.REACT_APP_API_URL;
  const [noticias, setNoticias]=useState([]);

  useEffect(()=>{
    consultarAPI();
  },[])

  const consultarAPI = async()=>{
    try{
      const consulta = await fetch(URL);
      const respuesta = await consulta.json();
      console.log(respuesta);
      setNoticias(respuesta);
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <div className='fuente'>
      <Router>
        <NavB></NavB>
        <Switch>
          <Route exact path="/">
            <Inicio></Inicio>
          </Route>
          <Route exact path="/categoria">
            <SeccionCategoria></SeccionCategoria>
          </Route>
          <Route exact path="/detalle">
            <DetalleNoticia></DetalleNoticia>
          </Route>
          <Route exact path="/ingresar">
            <Ingreso></Ingreso>
          </Route>
          <Route exact path="/suscribirse">
            <DetalleNoticia></DetalleNoticia>
          </Route>
          <Route exact path="/administracion">
            <Administración></Administración>
          </Route>
          <Route exact path="/administracion/nueva">
            <NuevaNoticia consultarAPI={consultarAPI}></NuevaNoticia>
          </Route>
          <Route exact path="/administracion/categorias">
            <ListarCategorias></ListarCategorias>
          </Route>
          <Route exact path="/administracion/noticias">
            <ListarNoticias></ListarNoticias>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>                                                                                                                                       
  );
}

export default App;
