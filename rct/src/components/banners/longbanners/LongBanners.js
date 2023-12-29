import React, { useState, useEffect } from 'react';
import './LongBanners.css'; // Asegúrate de tener un archivo CSS para estilos

const banners = [
  require('./MDC.jpg'), // Ajusta las rutas según la ubicación real de tus imágenes
  require('./ofer.jpg'),
];

const LongBanners = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    // Cambiar automáticamente el banner cada 5 segundos
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento vacío indica que este efecto solo se ejecuta al montar y desmontar el componente

  const changeBanner = (direction) => {
    // Cambiar manualmente el banner hacia adelante o hacia atrás
    if (direction === 'next') {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    } else if (direction === 'prev') {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
      );
    }
  };

  return (
    <div className="long-banners-container">
      <img className="banner-image" src={banners[currentBannerIndex]} alt={`Banner ${currentBannerIndex + 1}`} />
      <div className="arrow left-arrow" onClick={() => changeBanner('prev')}>
        {'<'}
      </div>
      <div className="arrow right-arrow" onClick={() => changeBanner('next')}>
        {'>'}
      </div>
    </div>
  );
};

export default LongBanners;
