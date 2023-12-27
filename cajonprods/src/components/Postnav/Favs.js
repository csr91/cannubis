import React, { useState } from 'react';
import './Favoritos.css'; // Asegúrate de tener un archivo CSS para estilizar tus favoritos

const Favoritos = () => {
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const handleMostrarFavoritos = () => {
    setMostrarFavoritos(!mostrarFavoritos);
  };

  return (
    <div className="favoritos-container">
      <span onClick={handleMostrarFavoritos} className="favoritos-enlace">
        Favoritos
      </span>

      {mostrarFavoritos && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Mis Favoritos</h3>
            <p>Texto que indica tus favoritos por ahora.</p>
            <button onClick={handleMostrarFavoritos}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favoritos;
