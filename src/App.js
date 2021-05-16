import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/common/Footer';
import NavB from './components/common/NavB'
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Inicio from './components/Inicio'
import Deportes from './components/categorias/Deportes'
import Espectaculos from './components/categorias/Espectaculos'
import Tecnologia from './components/categorias/Tecnologia'
import Politica from './components/categorias/Politica'
import Economia from './components/categorias/Economia'
import Salud from './components/categorias/Salud'
import Fotografia from './components/categorias/Fotografia'

function App() {
  return (
    <div>
      <Router>
        <NavB></NavB>
        <Switch>
          <Route exact path='/'>
            <Inicio></Inicio>
          </Route>
          <Route exact path='/deportes'>
            <Deportes></Deportes>
          </Route>
          <Route exact path='/espectaculos'>
            <Espectaculos></Espectaculos>
          </Route>
          <Route exact path='/tecnologia'>
            <Tecnologia></Tecnologia>
          </Route>
          <Route exact path='/politica'>
            <Politica></Politica>
          </Route>
          <Route exact path='/economia'>
            <Economia></Economia>
          </Route>
          <Route exact path='/salud'>
            <Salud></Salud>
          </Route>
          <Route exact path='/fotografia'>
            <Fotografia></Fotografia>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
