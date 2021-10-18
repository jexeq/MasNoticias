import { NavLink } from "react-router-dom";
import './mediumPubHere.css'

export default function mediumPubHere () {
    return (
        <div className='med-pubhere-cont'>
            <div className='med-pubhere-cont-sub'>
                <NavLink to="/contacto"> Publicite Aquí </NavLink>
            </div>
        </div>
    )
}
