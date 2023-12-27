import React from 'react';
import './Navbar.css';
import MiImagen from './images/192.png';  // Importa la imagen


function Navbar() {
  return (
    <div class="header-background-center-color">    
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
    </div>
  );
}

export default Navbar;