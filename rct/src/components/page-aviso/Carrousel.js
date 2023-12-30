import React, { useState, useEffect } from 'react';
import './carrousel.css';

const AvisoComponent = ({ id }) => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenActualIndex, setImagenActualIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/infoavisos/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();

        const imagenesFiltradas = Object.values(data)
          .filter(value => value && typeof value === 'string' && value.startsWith('https://'));

        setImagenes(imagenesFiltradas);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const cambiarImagen = (direccion) => {
    setImagenActualIndex((prevIndex) => {
      let newIndex = prevIndex + direccion;
      // Asegúrate de que el índice no esté fuera de los límites
      if (newIndex < 0) {
        newIndex = imagenes.length - 1;
      } else if (newIndex >= imagenes.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  return (
    <div className="aviso-container">
      {imagenes.length > 0 && (
        <div className="carrusel">
          <button className="flecha-izquierda" onClick={() => cambiarImagen(-1)}>&lt;</button>
          <div className="slide">
            <img
              src={imagenes[imagenActualIndex]}
              alt={`Imagen${imagenActualIndex + 1}`}
              className="imagen-carrusel"
            />
          </div>
          <button className="flecha-derecha" onClick={() => cambiarImagen(1)}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default AvisoComponent;
