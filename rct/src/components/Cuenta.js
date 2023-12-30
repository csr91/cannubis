import React from 'react';
import Navbar from './Navbar/Navbar';
import Postnav from './Postnav/Postnav';


function Cuenta() {

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
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuenta;
