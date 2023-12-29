import React, { useState } from 'react';
import './PriceFilter.css';

const Producto = () => {
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(100);

  return (
    <div className="price-section-container">
      <h2>Precios</h2>
      <div className="price-section-box-container">
        <div className="filter-box">
          <label htmlFor="minimo">Mínimo:</label>
          <input
            class="boxy"
            type="number"
            id="minimo"
            value={minimo}
            onChange={(e) => setMinimo(parseInt(e.target.value))}
          />
        </div>
        <div className="filter-box">
          <label htmlFor="maximo">Máximo:</label>
          <input
            class="boxy"
            type="number"
            id="maximo"
            value={maximo}
            onChange={(e) => setMaximo(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Producto;
