import React from "react";
import ReactLoading from "react-loading";

const PantallaCategorias = (props) => {
  return (
    <div className="carga-categoria">
      <h2 className='text-center fade-in-text my-4'>{props.categoria}</h2>
      <ReactLoading
        className="mx-auto fade-in-text"
        type={"spinningBubbles"}
        color={"#1d428d"}
      ></ReactLoading>
    </div>
  );
};

export default PantallaCategorias;
