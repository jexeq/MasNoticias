import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import './smallPublicityCard.css';

export default function SmallPublicityCard (props) {
    const [loading, setLoading ] = useState(true)
    const publicity = props.publicity;

    useEffect(()=> {
        console.log("smallpublicityCard 12 - publicity: " , publicity);
        if(publicity){
            setLoading(false);
        }
    })

    return !loading&&(
        <div className='small-pub-cont'>
            <a href={publicity?.redirect} target='_blank'>
                <img classname='small-pub-img' src={publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}