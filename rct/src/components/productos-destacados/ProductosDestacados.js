import React, { useState, useEffect } from 'react';
import './d-productosdestacados.css';
import './m-productosdestacados.css';

const ProductosDestacados = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/productos/destacados');
        if (!response.ok) {
          throw new Error('Error al obtener los productos destacados');
        }
        const productos = await response.json();
        const productosAleatorios = obtenerProductosAleatorios(productos, 24);
        setProductosDestacados(productosAleatorios);
      } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
      }
    };

    obtenerProductosDestacados();
  }, []);

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

  // Función para redireccionar a un aviso específico
  const redireccionarAviso = (idAviso) => {
    const url = new URL(`/rct/aviso/${idAviso}`, window.location.origin);
    window.location.href = url.toString();
  };

  // Función para generar un recuadro de producto en JSX
  const generarRecuadro = (producto) => (
    <div key={producto.Idaviso} className="recuadro" onClick={() => redireccionarAviso(producto.Idaviso)}>
      <div className='recuadrocontent'>
        <div className="recuadro-titulo">
          <p>{producto.Titulo}</p>
        </div>
        <img src={producto.Imagenes[0]} alt={producto.Titulo} />
        <div className="recuadro-precio">
          <h3>{"$" + producto.Precio}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div id="productos-destacados">
      <h2>Productos Destacados</h2>
      <div id="productos-destacados-superior">
        {productosDestacados.slice(0, 12).map((producto) => generarRecuadro(producto))}
      </div>
      <div id="productos-destacados-inferior">
        {productosDestacados.slice(12, 24).map((producto) => generarRecuadro(producto))}
      </div>
    </div>
  );
};

export default ProductosDestacados;
