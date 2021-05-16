import React from "react";

const Inicio = () => {
  return (
    <div className="container text-muted">
      <section className="my-3">
        <h2 className='mt-5'>LO MÁS BUSCADO</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure,
              quaerat adipisci? Error placeat deleniti, quibusdam dolores
              dolorum laborum non dolor inventore.
            </p>
          </div>
          <div className="col-lg-3">
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
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>

      <section className="my-3">
        <h2 className='mt-5'>COVID</h2>
        <div className="row my-2">
          <div className="col-lg-6">
            <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
          <div className="col-lg-6">
            <div className="bg-secondary w-100 div-imagen-grande mb-2"></div>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              iste odit!
            </h6>
          </div>
        </div>
      </section>

      <section className="my-3">
        <h2 className='mt-5'>MÁS NOTICIAS</h2>
        <div className="row">
          <div className="col-lg-9">
            <div className="row my-2">
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
            </div>
            <h2 className='mt-5'>EL TIEMPO</h2>
            <div className="row my-2">
                <div className="col-lg-12">
                <div className="bg-secondary w-100 div-clima mb-2"></div>
                </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="bg-secondary w-75 div-anuncio ml-auto"></div>
          </div>
        </div>
      </section>
      
      <section>
          <h2 className='mt-5'>CRIPTOMONEDAS</h2>
        <div className="bg-secondary w-100 div-clima mb-2"></div>
      </section>
    </div>
  );
};

export default Inicio;
