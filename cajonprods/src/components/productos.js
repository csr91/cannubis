import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/avisos-por-filtro/5');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  // Dividir los productos en tres arrays (columnas)
  const productos1 = productos.slice(0, Math.ceil(productos.length / 3));
  const productos2 = productos.slice(Math.ceil(productos.length / 3), Math.ceil((2 * productos.length) / 3));
  const productos3 = productos.slice(Math.ceil((2 * productos.length) / 3));

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className='styleprecajon' id='precajon'>
        <p id="enviar-a">Enviar a:</p>
      </div>
      <main>
        <div className="container">
          {/* Columna de categorías */}
          <div className="columna-categorias">
            <h2>Categsssorías</h2>
          </div>

          {/* Columnas de productos */}
          <div className="columna-productos">
            <h2>Productos 1</h2>
            {productos1.map(producto => (
              <div key={producto.Idaviso}>
                <img src={producto.Imagen1} alt={producto.Titulo} />
                <p>{producto.Titulo}</p>
                <p>{producto.Descripcion}</p>
                <p>${producto.Precio}</p>
              </div>
            ))}
          </div>
          <div className="columna-productos">
            <h2>Productos 2</h2>
            {productos2.map(producto => (
              <div key={producto.Idaviso}>
                <img src={producto.Imagen1} alt={producto.Titulo} />
                <p>{producto.Titulo}</p>
                <p>{producto.Descripcion}</p>
                <p>${producto.Precio}</p>
              </div>
            ))}
          </div>
          <div className="columna-productos">
            <h2>Productos 3</h2>
            {productos3.map(producto => (
              <div key={producto.Idaviso}>
                <img src={producto.Imagen1} alt={producto.Titulo} />
                <p>{producto.Titulo}</p>
                <p>{producto.Descripcion}</p>
                <p>${producto.Precio}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Productos;
