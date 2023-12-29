import React, { useState } from 'react';
import './Toggle.css'; // Asegúrate de tener un archivo CSS para estilizar tu toggle

const Toggle = ({ onToggle }) => {
  const [activo, setActivo] = useState(false);

  const handleToggleClick = () => {
    setActivo(!activo);
    onToggle(!activo); // Llamar a la función de acción pasando el estado activo
  };

  return (
    <div className={`toggle-container ${activo ? 'activo' : ''}`} onClick={handleToggleClick}>
      <div className="linea"></div>
      <div className="linea"></div>
      <div className="linea"></div>
    </div>
  );
};

export default Toggle;
