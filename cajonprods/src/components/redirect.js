import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonRedireccion = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Puedes agregar lógica adicional antes de redirigir si es necesario
    console.log('Botón clickeado');

    // Redirigir a la URL deseada
    navigate('http://127.0.0.1:5000/aviso?id=1');
  };

  return (
    <div className='styleprecajon' id='precajon'>
      <p id="enviar-a">Enviar a:</p>
      <button onClick={handleClick}>Ir a Aviso</button>
    </div>
  );
};

export default BotonRedireccion;
