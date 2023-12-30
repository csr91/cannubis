import React from 'react';
import './LongBanners.css';

const MdcOffer = ({ type }) => {
  const getImageSource = () => {
    if (type === 'Mdc') {
      return require('./mdc.png');
    } else if (type === 'Offer') {
      return require('./offer.png');
    } else {
      // Manejar un caso por defecto o mostrar un placeholder si es necesario
      return require('./ofer.jpg'); // Reemplaza con la ruta de tu imagen de placeholder
    }
  };

  return (
    <div className="mdc-offer">
      <img src={getImageSource()} alt={type} style={{ width: '1200px' }} />
    </div>
  );
};

export default MdcOffer;
