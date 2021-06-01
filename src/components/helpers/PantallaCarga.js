import React from "react";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const PantallaCarga = () => {
  return (
      <div className='carga'>
        <h1 className="font-weight-light text-center azul my-3">
          Rolling<span className="font-weight-bold">news.</span>
        </h1>
        <p className='small text-center my-3'>Cargando..</p>
        <ReactLoading
          className="mx-auto"
          type={"spinningBubbles"}
          color={"#1d428d"}
        ></ReactLoading>
      </div>
  );
};

export default PantallaCarga;
