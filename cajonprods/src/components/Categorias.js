import './Navbar.css';
import React, { useEffect, useState } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Llamada al endpoint
    fetch('http://127.0.0.1:5000/productos/filtros')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categorias:', error));
  }, []);

  return (
    <div className="columna-categorias">
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.idfiltro}>
              {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;
