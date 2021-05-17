import React from 'react';
import { Link } from 'react-router-dom';

const Administración = () => {
    return (
        <div className='text-center'>
            <h2 className='text-center my-5'>BIENVENIDO <br/> ADMINISTRADOR</h2>
            <Link exact={true} to='administracion/noticias' className='btn btn-outline-primary w-25 py-5 mx-2'>Noticias</Link>
            <Link exact={true} to='administracion/categorias' className='btn btn-outline-primary w-25 py-5 mx-2'>Categorias</Link>
            <Link exact={true} to='administracion/nueva' className='btn btn-outline-primary w-25 py-5 mx-2'>Nueva noticia</Link>
            <p className='my-5'>Información del sistema v0.1</p>
        </div>
    );
};

export default Administración;