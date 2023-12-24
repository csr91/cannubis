import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <header>    
    <div class="nav-container">
      <div class="nav-izquierda">
        <h1>
          Grow Shop Online
        </h1>  
      </div>
      <div id="lupa" class="nav-center">
      </div>
      <div class="nav-derecha">
        <nav>
          <ul class="nav-menu1">
          <li><a href="/inicio">Inicio</a></li>
            <li><a href="/productos">Categorias</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/mi_cuenta">Mi Cuenta</a></li>
          </ul>
        </nav>  
      </div>  
    </div>
  </header>
  );
}

export default Navbar;