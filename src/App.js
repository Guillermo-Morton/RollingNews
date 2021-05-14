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

function App() {
  return (
    <div>
      <Router>
        <NavB></NavB>
        <Switch>
          <Route exact path='/'>
            <Inicio> </Inicio>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
