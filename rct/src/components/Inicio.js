import React from 'react';
import Navbar from './Navbar/Navbar';
import Postnav from './Postnav/Postnav';
import BigBanners from './banners/bigbanners/BigBanners';
import ProductosDestacados from './productos-destacados/ProductosDestacados';
import './page-Inicio/inicio.css';

import TiendasDestacadas from './tiendas-destacadas/TiendasDestacadas';
import MdcOffer from './banners/longbanners/MdcOffer';


function Inicio() {

  return (
    <div>
      <div className="outheader">
        <div className="background">
          <header>
            <Navbar />
          </header>
          <div className="background-center-color">
            <div className="postnav-container">
              <Postnav />
            </div>
            <div className='indexcss-margin1'>
              <div className='bigbanner'>
                <div className='indexcss-margin1'>
                  <BigBanners />
                </div>
              </div>
            </div>
            <div className='indexcss-margin1'>
              <div class="center-content-backgroundcolor">
                <div className='center-content-1300'>
                  <div className='indexcss-margin1'>
                    <ProductosDestacados />
                  </div>
                </div>
              </div>
            </div>
            <div className='indexcss-magin1'>
              <div className='indexcss-magin1'>
                <MdcOffer type="Offer" />
              </div>
            </div>
            <div className='indexcss-margin1'>
              <div class="center-content-backgroundcolor">
                <div className='center-content-1300'>
                  <TiendasDestacadas />                    
                </div>
              </div>
            </div>
            <div className='indexcss-margin1'>
            <MdcOffer type="Mdc" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Inicio;
