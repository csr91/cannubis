import React from 'react';
import './Encabezado.css';

const Encabezado = () => {
  return (
    <header className="encabezado">
      <div className="logo">
        {/* Aquí coloca el código o la imagen de tu logo */}
        <img src="ruta_de_tu_logo.png" alt="Logo" />
      </div>
      <div className="buscar">
        {/* Aquí puedes agregar un campo de búsqueda */}
        <input type="text" placeholder="Buscar productos" />
      </div>
      <div className="medios-de-pago">
        {/* Aquí puedes agregar el botón de medios de pago */}
        <button>Medios de Pago</button>
      </div>
    </header>
  );
};

export default Encabezado;
