import FetchEnviara from './FetchEnviara';
import FetchAccount from './FetchAccount';
import './Postnav.css';

function Postnav() {
    return (
        <div class="postnav">
            <div class="postnav-center-container">
                <div class="postnav-content">
                    <div class="postnav-enviara">
                    <FetchEnviara />
                    </div>
                    <div class="postnav-account">
                    <FetchAccount />
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
    );  
}

export default Postnav;