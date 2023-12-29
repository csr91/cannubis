import React, { useState, useEffect } from 'react';
import './Filtros.css';

const Filtros = () => {
  const [filtros, setFiltros] = useState([]);
  const [mostrarHijos, setMostrarHijos] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/productos/filtros');
        const data = await response.json();
        setFiltros(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTogglePadre = (idPadre) => {
    setMostrarHijos((prevMostrarHijos) => ({
      ...prevMostrarHijos,
      [idPadre]: !prevMostrarHijos[idPadre],
    }));
  };

  return (
    <div className="filtros-container">
      <h2>Categorias</h2>
      {filtros
        .filter((filtro) => filtro.idfiltropadre === null)
        .map((filtroPadre) => (
          <div key={filtroPadre.idfiltro}>
            <div
              onClick={() => handleTogglePadre(filtroPadre.idfiltro)}
              className={`filtro-padre ${mostrarHijos[filtroPadre.idfiltro] ? 'activo' : ''}`}
            >
              {filtroPadre.nombre}
            </div>
            {mostrarHijos[filtroPadre.idfiltro] && (
              <div className={`hijos ${mostrarHijos[filtroPadre.idfiltro] ? 'visible' : ''}`}>
                {filtros
                  .filter((hijo) => hijo.idfiltropadre === filtroPadre.idfiltro)
                  .map((hijo) => (
                    <div class="filtro-hijo" key={hijo.idfiltro}>{hijo.nombre}</div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Filtros;
