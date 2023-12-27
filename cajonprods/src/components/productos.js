import PriceFilter from './Left-column/PriceFilter';
import Categorias from './Left-column/Categorias';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import './productos.css';
import LongBanners from './banners/longbanners/LongBanners';
import Postnav from './Postnav/Postnav';
import OrdenarPor from './main/OrdenarPor';

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
    <div class="outheader">
      <div class="background">
        <header>
          <Navbar />
        </header>
        <div class="background-center-color">
          <div class="postnav-container">
            <Postnav />
          </div>
          <div class="maincenterbackground">
            <div class="longbanners">
              <LongBanners />
            </div>
            <main class='main'>
              <div class="centerbox">
                  <OrdenarPor />
                <div className="container">
                  <div class="left-column">
                    <PriceFilter />
                    <Categorias />
                  </div>
                  <div className="columna-productos">
                    {productos1.map(producto => (
                      <div key={producto.Idaviso}>
                        <a href={`http://127.0.0.1:5000/aviso?id=${producto.Idaviso}`}>
                          <img src={producto.Imagen1} alt={producto.Titulo} className="imagen-producto" />
                          <p>{producto.Titulo}</p>
                          <p>{producto.Descripcion}</p>
                          <p>${producto.Precio}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="columna-productos">
                    {productos2.map(producto => (
                      <div key={producto.Idaviso}>
                        <a href={`/aviso?id=${producto.Idaviso}`}>
                          <img src={producto.Imagen1} alt={producto.Titulo} className="imagen-producto" />
                          <p>{producto.Titulo}</p>
                          <p>{producto.Descripcion}</p>
                          <p>${producto.Precio}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="columna-productos">
                    {productos3.map(producto => (
                      <div key={producto.Idaviso}>
                        <a href={`/aviso?id=${producto.Idaviso}`}>
                          <img src={producto.Imagen1} alt={producto.Titulo} className="imagen-producto" />
                          <p>{producto.Titulo}</p>
                          <p>{producto.Descripcion}</p>
                          <p>${producto.Precio}</p>                  
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
