import logo from '../../images/mas-noticias.png';
import "./NavBar.css";
import { useState } from 'react';

export default function NavBar () {

    const [toFind, setToFind] = useState("")



            function onChangeHandler (e) {

                e.preventDefault();
                setToFind(e.target.value);
                console.log("toFind: " , toFind)
            }

    return (
        <div className="nav-container">
            <img className="logo1" src={logo} alt="image"/>
            {/* <h1 className="nav-title"> MAS NOTICIAS</h1> */}
            {/* <button onClick={Searchbar}>Buscar</button> */}
            <div>
                <form>
                <input type="text" value={toFind} onChange={onChangeHandler}/>
                <button type="submit">Buscar</button>
                </form>
            </div>
        </div>
    )
}