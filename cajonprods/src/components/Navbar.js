import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div>    
      <div className="nav-container">
        <div className="nav-izquierda">
          <h1>
            Grow Shop Online
          </h1>  
        </div>
        <div id="lupa" className="nav-center">
          <input type="text" id="searchInput" placeholder="Buscar..." />
        </div>
        <div className="nav-derecha">
          <nav>
            <ul className="nav-menu1">
              <li><a href="/inicio">Inicio</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/mi_cuenta">Mi Cuenta</a></li>
            </ul>
          </nav>  
        </div>
      </div>
    </div>
  );
}

export default Navbar;