import React, { useState, useEffect, useRef } from 'react';

const Separator = () => {
  const separatorRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      if (separatorRef.current) {
        const separatorPosition = separatorRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const separatorTop = separatorPosition.top;
        const separatorBottom = separatorPosition.bottom;

        const visiblePercentage = Math.min(100, Math.max(0, (windowHeight - separatorTop) / (windowHeight + separatorBottom)));
        
        // Calcular el ancho mínimo del 50%
        const minWidth = 50;

        // Calcular el ancho ajustado (máximo entre el porcentaje calculado y el ancho mínimo)
        const adjustedWidth = Math.max(minWidth, visiblePercentage);

        setScrollWidth(adjustedWidth);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  const separatorStyle = {
    width: `${scrollWidth}%`,
    height: '2px',
    backgroundColor: 'black',
    margin: '2% auto 0',
    transition: 'width 0.3s ease-in-out',
  };

  return <div ref={separatorRef} style={separatorStyle}></div>;
};

const throttle = (callback, delay) => {
  let lastCall = 0;
  return function () {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    callback.apply(null, arguments);
  };
};

export default Separator;
