import React, { useState, useEffect } from 'react';
import './tiendasdestacadas.css';


// Función para obtener productos aleatorios
const obtenerProductosAleatorios = (productos, cantidad) => {
  const productosAleatorios = [];
  const copiaProductos = productos.slice();

  while (productosAleatorios.length < cantidad && copiaProductos.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * copiaProductos.length);
    const productoAleatorio = copiaProductos.splice(indiceAleatorio, 1)[0];
    productosAleatorios.push(productoAleatorio);
  }

  return productosAleatorios;
};

const TiendasDestacadas = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/tiendas/destacadas');
        if (!response.ok) {
          throw new Error('Error al obtener tiendas destacadas');
        }

        const data = await response.json();
        const productosAleatorios = obtenerProductosAleatorios(data, 8);
        setProductosDestacados(productosAleatorios);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProductosDestacados();
  }, []);

  // Función para generar un recuadro de producto en JSX
  const generarRecuadro = (tienda) => (
    <div key={tienda.Idtienda} className="recuadro" onClick={() => redireccionarTienda(tienda.Idtienda)}>
      <div className="contenido">
        <p>{tienda.Nombre}</p>
      </div>
      <img src={tienda.Imagen} alt={tienda.Nombre} />
    </div>
  );

  const redireccionarTienda = (idTienda) => {
    // Implementa la lógica de redirección a la tienda específica
    console.log(`Redireccionando a la tienda con ID ${idTienda}`);
  };

  return (
    <div id='tiendas-destacadas'>
      <h2>Tiendas Destacadas</h2>
      <div>
        {productosDestacados.map((tienda) => generarRecuadro(tienda))}
      </div>
    </div>
  );
};

export default TiendasDestacadas;
