import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import './smallPublicityCard.css';

export default function SmallPublicityCard (props) {
    // const [loading, setLoading ] = useState(true)
    // const [publicity, setPublicity ] = useState(props.publicity);

    // useEffect(()=> {
    //     console.log("smallpublicityCard 12 - publicity: " , publicity);
    // },[])
    
    // useEffect(()=>{
    //     if(publicity){
    //         setLoading(false);
    //     }
    // },[publicity])

    console.log("smallpublicitycard - 21 - props.publicity" , props.publicity);

    return (
        <div className='small-pub-cont'>
            <a  href={props.publicity?.redirect} target='_blank'>
                Publicidad
                <img className='small-pub-img' src={props.publicity?.url} alt="publicidad" />
            </a>
        </div>
    )
}