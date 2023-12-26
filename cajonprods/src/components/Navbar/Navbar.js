import React from 'react';
import './Navbar.css';
import MiImagen from './images/192.png';  // Importa la imagen
import FetchEnviara from './FetchEnviara';

function Navbar() {
  return (
    <div>    
      <div className="nav-container">
        <div class="nav-center">
          <div className="nav-center-left">
            <img class="logo" src={MiImagen} alt="Descripción de la imagen" />
          </div>
          <div id="lupa" className="nav--center-center">
            <input type="text" id="searchInput" placeholder="Buscar..." />
          </div>
          <div className="nav-center-right">
            <nav>
              <ul className="nav-menu1">
                <li><a href="/">Inicio</a></li>
                <li><a href="/productos">Productos</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="/mi_cuenta">Mi Cuenta</a></li>
              </ul>
            </nav>  
          </div>
        </div>
      </div>
      <div class="postnav">
        <div class="postnav-center">
          <div class="postnav-content">
            <div class="postnav-enviara">
              <FetchEnviara />
            </div>
            <div class="postnav-account">
            micuenta
            </div>
            <div class="postnav-shopping-favs">
            miscompras favs
            </div>
            <div class="postnav-cart-bell">
            cart bell
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;