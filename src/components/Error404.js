import React from "react";
import { useEffect } from "react";
import error from "../img/404.png";
import { withRouter, useLocation } from "react-router-dom";

const Error404 = (props) => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(()=>{
        props.history.push('/')
        props.toggleScroll();
    }, 1500)
  }, [location.pathname]);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <img className="error" src={error} alt="" />
      </div>
      <p className="text-center lead">
        No se encontró el destino, redirigiendo...
      </p>
    </div>
  );
};

export default withRouter(Error404);
