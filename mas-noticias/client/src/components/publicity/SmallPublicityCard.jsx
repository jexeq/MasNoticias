import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import './smallPublicityCard.css';

export default function SmallPublicityCard (props) {
   
    return (
        <div className='small-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                Publicidad
                <img className='small-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
    
}