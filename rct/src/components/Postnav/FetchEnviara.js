import React, { useState, useEffect } from 'react';

const FetchEnviara = () => {
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/infocuentas');
        const data = await response.json();

        // Actualizar el estado con el valor de 'direccion'
        setDireccion(data.direccion);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llamar a la función para obtener datos cuando el componente se monta
    fetchData();
  }, []); // El segundo argumento del useEffect es una lista de dependencias, en este caso, un array vacío para ejecutar una vez al montar el componente.

  return (
    <div>
      {direccion}
    </div>
  );
};

export default FetchEnviara;
