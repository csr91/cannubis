import React, { useState, useEffect } from 'react';
import './Fetch.css';

const FetchAccount = () => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/infocuentas');
        const data = await response.json();
        if (data.nombre) {
          setNombre(data.nombre);
        } else {
          setNombre(<a href="/login" className="custom-link">Ingresá</a>);
        }
      } catch (error) {
        // Manejar errores de la solicitud
        setNombre(<a href="/login" className="custom-link">Ingresá</a>);
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
