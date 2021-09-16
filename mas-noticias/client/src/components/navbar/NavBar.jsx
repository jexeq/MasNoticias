import logo from '../../images/mas-noticias.png';
import "./NavBar.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherReport from '../weather/Weather';
import { getWeather } from '../../redux/actions/weather/weatherActions';

export default function NavBar () {

    const dispatch = useDispatch();
    const [toFind, setToFind] = useState("")
    const weather = useSelector(state=>state.weatherReducer.weather.report)

            function onChangeHandler (e) {

                e.preventDefault();
                setToFind(e.target.value);
                console.log("toFind: " , toFind)
            }

    useEffect( ()=> {
        dispatch(getWeather());
    },[])        

    return (
        <div className="nav-container">
            <img className="logo1" src={logo} alt="image"/>
            {/* <h1 className="nav-title"> MAS NOTICIAS</h1> */}
            {/* <button onClick={Searchbar}>Buscar</button> */}
            <div>
                <form className="searchbar">
                <input type="text" value={toFind} onChange={onChangeHandler}/>
                <button type="submit">Buscar</button>
                </form>
            </div>
            {weather?<WeatherReport/>:<p>Loading...</p>}
            
        </div>
    )
}