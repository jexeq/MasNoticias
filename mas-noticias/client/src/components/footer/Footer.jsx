import logo from '../../images/mas-noticias.png';
import { NavLink } from 'react-router-dom';
import './footer.css';

export default function Footer () {


    return (
        <div className='footer-main-cont'>
            <div>
                <img className='footer-logo' src={logo} alt="logo" />
            </div>
            <div >
                <NavLink  className='footer-redirect' to={"/contacto"}>
                    Contáctanos
                </NavLink>
                
            </div>
            <div className='media-cont'>
                <a className='media-item' href="https://www.facebook.com/MasNoticiasTuc" target="_blank">
                    <img className='footer-icons' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/240px-Facebook_logo_%28square%29.png" alt="se" />
                </a>

                <a className='media-item' href="https://www.instagram.com/masnoticias.tuc/" target="_blank">
                    <img className='footer-icons' src="https://www.msm.gov.ar/wp-content/uploads/2020/05/new-instagram-logo-png-transparent-light.png" alt="se" />
                </a>

                <a className='media-item' href="/contacto" target="_blank">
                    <img className='footer-icons' src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png" alt="se" />
                </a>

            </div>
        </div>
    )
}

