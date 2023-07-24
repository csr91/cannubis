import React, { useEffect, useState } from 'react';
import './App.css';
import Encabezado from './componentes/Encabezado';
import Categorias from './componentes/categorias';

function App() {
  // Estado para almacenar las categorías
  const [categorias, setCategorias] = useState([]);

  // Función para obtener las categorías desde la API
  const obtenerCategorias = async () => {
    try {
      const response = await fetch('/productos/filtros'); // Hacer la solicitud a la API
      const data = await response.json(); // Convertir la respuesta a formato JSON
      setCategorias(data); // Actualizar el estado con las categorías obtenidas
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  // useEffect para obtener las categorías cuando se monte el componente
  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <div className="App">
      <Encabezado />
      <Categorias categorias={categorias} />
      {/* Aquí puedes agregar el resto de tu contenido */}
    </div>
  );
}

export default App;