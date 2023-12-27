import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons';
import FetchEnviara from './FetchEnviara';
import FetchAccount from './FetchAccount';
import './Postnav.css';
import Favoritos from './Favs';

function Postnav() {
  return (
    <div className="postnav">
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
                    <a href="/mis-compras">Mis Compras</a>
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
        </div>
      </div>
    </div>
  );
}

export default Postnav;
