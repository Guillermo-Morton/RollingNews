import React, { useState, useEffect } from "react";
import { useParams} from "react-router";
const DetalleNoticia = () => {
  const URL = process.env.REACT_APP_API_URL;
    // obtengo el parametro de la URL
    const { id } = useParams();
    // declaramos los states
  const [noticia, setNoticia] = useState({});
  const [categoria, setCategoria] = useState('');
  // consultamos la noticia seleccionada
  const consultarNoticia = async () => {
    try {
      const respuesta = await fetch(URL + `/${id}`);
      if (respuesta.status === 200) {
        const resultado = await respuesta.json();
        // actualizo el state
        setNoticia(resultado);
        setCategoria(resultado.categoria.toUpperCase())
        console.log(resultado);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    consultarNoticia();
  }, [id]);
  return (
    <div className="container text-muted">
      <h2 className="mt-5">
        {noticia.titulo}
      </h2>
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-12">
              <section>
                <img src={noticia.imagen1} className="bg-secondary w-100 div-imagen-grande mb-2"></img>
                <h5>
                 {noticia.subtitulo}
                </h5>
                <p>
                  {noticia.parrafo1}
                </p>
                <p>
                 {noticia.parrafo2}
                </p>
              </section>

              <section>
                <img src={noticia.imagen2} className="bg-secondary w-100 div-imagen-grande mb-2"></img>
                <p>
                 {noticia.parrafo3}
                </p>
              </section>
              <h2 className='mt-5'>MÁS SOBRE {categoria}</h2>
              <section className="row">
                <div className="col-lg-4">
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                </div>
                <div className="col-lg-4">
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                </div>
                <div className="col-lg-4">
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                  <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, iste odit!
                  </h6>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="d-flex flex-column">
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
            <div className="bg-secondary w-100 div-imagen-chica mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
            <div className="bg-secondary w-75 div-anuncio2 ml-auto mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleNoticia;
