import React, { useState } from 'react';
import './OrdenarPor.css'; // Asegúrate de tener un archivo CSS para estilizar tus favoritos

const OrdenarPor = ({ onOrdenar }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('relevante');

  const handleSeleccionarOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
    onOrdenar(opcion); // Llamar a la función de ordenar pasando la opción seleccionada
  };

  return (
    <div className="ordenar-por-container">
      <span className="ordenar-por-etiqueta">Ordenar por:</span>
      <select
        value={opcionSeleccionada}
        onChange={(e) => handleSeleccionarOpcion(e.target.value)}
      >
        <option value="relevante">Relevante</option>
        <option value="menor-precio">Menor Precio</option>
        <option value="mayor-precio">Mayor Precio</option>
      </select>
    </div>
  );
};

export default OrdenarPor;
