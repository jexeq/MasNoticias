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
            <div>
                <a href="https://www.facebook.com/MasNoticiasTuc" target="_blank">
                    <img className='footer-icons' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/240px-Facebook_logo_%28square%29.png" alt="se" />
                </a>
            </div>
        </div>
    )
}