import React, { useState, useEffect } from 'react';
import './BigBanners.css';

const banners = [
  require('./banner1.jpg'),
  require('./banner2.jpg'),
  require('./banner3.jpeg'),
];

const BigBanners = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const changeBanner = (direction) => {
    if (direction === 'next') {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    } else if (direction === 'prev') {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
      );
    }
  };

  return (
    <div className="big-banners-container">
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

export default BigBanners;