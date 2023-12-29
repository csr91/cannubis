import React, { useState, useEffect } from 'react';

const FetchAccount = () => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/infocuentas');
        const data = await response.json();

        // Actualizar el estado con el valor de 'direccion'
        setNombre(data.nombre);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {nombre}
    </div>
  );
};

export default FetchAccount;
