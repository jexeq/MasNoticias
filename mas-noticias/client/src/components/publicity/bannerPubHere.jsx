import { NavLink } from "react-router-dom";
import './bannerPublicity.css'

export default function bannerPubHere () {
    return (
        <div className='banner-pub-cont'>
            <div className='banner-pub-img'>
                <NavLink className='d-flex align-items-center justify-content-center' to="/contacto"> Publicite Aquí </NavLink>
            </div>
        </div>
    )
}