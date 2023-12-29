import React, { useState, useEffect } from 'react';
import Carrousel from './Carrousel';

// Componente funcional para mostrar el contenido principal del aviso
function AvisoContent({ id }) {
  const [avisoInfo, setAvisoInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/infoavisos/${id}`);
        const data = await response.json();
  
        // Verificar si la respuesta es un JSON válido
        if (data) {
          setAvisoInfo(data);
        } else {
          throw new Error("La respuesta no es un JSON válido");
        }
      } catch (error) {
        const secondResponse = await fetch(`http://127.0.0.1:5000/infoavisos/${id}`);
        const secondData = await secondResponse.json();
        setAvisoInfo(secondData);
      }
    };
  
    fetchData();
  }, [id]);

  return (
    <div className="maincenterbackground">
      {avisoInfo ? (
        <div>
          <h2>{avisoInfo.Titulo}</h2>
          <p>{avisoInfo.Descripcion}</p>
          <p>Precio: {avisoInfo.Precio}</p>
          <p>Stock: {avisoInfo.Stockproducto}</p>
          {/* Mostrar más información según tus necesidades */}
          <Carrousel />
        </div>
      ) : (
        <p>Cargando información del aviso...</p>
      )}
    </div>
  );
}

export default AvisoContent;
