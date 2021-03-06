import React, { useEffect, useState } from "react";

const ElTiempo = () => {
  // datos para consultar a la api
  const ciudad = "Yerba Buena";
  const key = "a2a36be300f39f02b24f47f11053efeb";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric&lang=es`;
  //   nuestros state
  const [datosMain, setDatosMain] = useState([]);
  const [datosTiempo, setDatosTiempo] = useState([]);

  const consultarTiempo = async () => {
    try {
      const respuesta = await fetch(URL);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setDatosMain(resultado.main);
        setDatosTiempo(resultado.weather[0].description.toUpperCase());
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    consultarTiempo();
  }, []);
  return (
    <div className='container'>
      <h2 className="mt-5 text-center">EL TIEMPO</h2>
      <div className="row my-2">
        <div className="d-flex flex-wrap justify-content-center">
          <h3 className='mx-4 my-3 text-center'>{ciudad}</h3>
          <h3 className="font-weight-light mx-4 my-3 text-center">
            {datosTiempo}
          </h3>
          <h3 className='mx-4 my-3 text-center'>
            <span className="font-weight-light">La temperatura es de </span>
            {datosMain.temp}°c
          </h3>
          <h3 className='mx-4 my-3 text-center'>
            <span className="font-weight-light">Sensacion termica de </span>
            {datosMain.feels_like}°c
          </h3>
          <h3 className='mx-4 my-3 text-center'>
            <span className="font-weight-light">Humedad: </span>
            {datosMain.humidity}%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ElTiempo;
