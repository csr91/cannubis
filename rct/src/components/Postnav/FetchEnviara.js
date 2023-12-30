import React, { useState, useEffect } from 'react';

const FetchEnviara = () => {
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/infocuentas');
        const data = await response.json();
        if (data.direccion) {
          setDireccion("Enviar a: " + data.direccion);
        } else {
          setDireccion(<a href="/signin" className="custom-link">Crear cuenta</a>);
        }
      } catch (error) {
        setDireccion(<a href="/signin" className="custom-link">Crear cuenta</a>);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {direccion}
    </div>
  );
};

export default FetchEnviara