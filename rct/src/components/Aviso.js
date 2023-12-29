import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Postnav from './Postnav/Postnav';
import AvisoContent from './page-aviso/AvisoContent';  // Importar el componente de contenido

function Aviso() {
  const { id } = useParams();

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
            <AvisoContent id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aviso;
