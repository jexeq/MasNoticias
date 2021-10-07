import { NavLink } from "react-router-dom";
import './smallPubHere.css';

export default function smallPubHere () {
    return (
        <div className='small-pubh-cont'>
            <div >
                <NavLink to="/contacto"> Publicite Aquí </NavLink>
            </div>
        </div>
    )
}