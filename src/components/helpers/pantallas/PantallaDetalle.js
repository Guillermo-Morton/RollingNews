import React from "react";
import ReactLoading from "react-loading";

const PantallaDetalle = () => {
  return (
    <div className='carga'>
      <p className="small text-center my-3 fade-in-text">Cargando..</p>
      <ReactLoading
        className="mx-auto fade-in-text"
        type={"spinningBubbles"}
        color={"#1d428d"}
      ></ReactLoading>
    </div>
  );
};

export default PantallaDetalle;
