import React from 'react';
import './d-Navbar.css';
import './m-Navbar.css';
import LogoWhite from './images/192.png';  // Importa la imagen
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons'; 
import Toggle from '../toggle/Toggle';


function IndexNavbar() {
  return ( 
      <div className="index-header-background-center-color">
        <div class="nav-center">
          <div class="nav-postcenter">
            <div className="d-nav-center-left">
              <img class="logowhite" src={LogoWhite} alt="Descripción de la imagen" />
            </div>
            <div className="m-nav-center-left">
              <img class="logoblack" src={LogoWhite} alt="Descripción de la imagen" />
            </div>
            <div id="lupa" className="d-nav-center-center">
              <input type="text" id="searchInput" placeholder="Buscar..." />
            </div>
            <div className="d-nav-center-right">
              <nav>
                <ul className="nav-menu1">
                  <li><a href="/">Inicio</a></li>
                  <li><a href="/rct/productos">Productos</a></li>
                  <li><a href="/contacto">Contacto</a></li>
                  <li><a href="/rct/cuenta">Mi Cuenta</a></li>
                </ul>
              </nav>  
            </div>
            <div className="m-nav-center-right">
              <div className="navbar-cart-bell">
                <FontAwesomeIcon icon={faBell} />
                <FontAwesomeIcon icon={faShoppingCart} />
                <Toggle />  
              </div>
            </div>
          </div>
        </div>
      </div> 
    
  );
}

export default IndexNavbar;