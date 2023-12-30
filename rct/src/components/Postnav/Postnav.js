import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons';
import FetchEnviara from './FetchEnviara';
import FetchAccount from './FetchAccount';
import './d-Postnav.css';
import './m-Postnav.css';
import Favoritos from './Favs';

function Postnav() {
  return (
    <div className="postnav">
      <div className="postnav-full-container">
        <div className="postnav-center-container">
            <div className="postnav-content">
                <div className="postnav-content-byfour">
                    <div className="postnav-enviara">
                        <FetchEnviara />
                    </div>
                </div>
                <div className="postnav-content-byfour">
                    <div className="postnav-account">
                        <FetchAccount />
                    </div>
                </div>
                <div className="postnav-content-byfour">
                    <div className="postnav-shopping-favs">
                        <div class="postnav-shopping-favs-content">
                        <a href="/mis-compras" className="custom-link">Mis Compras</a>
                        </div>
                        <div class="postnav-shopping-favs-content">
                        <Favoritos />
                        </div>
                    </div>
                </div>
                <div className="postnav-content-byfour">
                    <div className="postnav-cart-bell">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                </div>
                <div id="lupa" className="m-postnav-center-lupa">
                    <input className="m-lupa" type="text" id="searchInput" placeholder="Buscar..." />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Postnav;
