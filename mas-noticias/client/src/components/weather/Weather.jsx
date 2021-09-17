
import { useSelector } from 'react-redux';
import WeatherCard from './weatherCard';
import {useHistory} from 'react-router-dom';
import "./weather.css";

export default function WeatherReport () {
    const history = useHistory();
    const weather = useSelector(state=>state.weatherReducer.weather)
   
    function onRedirect () {
        history.push("/fullWeather")
    }

    return (
        <div className="weather-main" title="ver pronóstico">
            <button className="weather-button" onClick={onRedirect}>
                <WeatherCard singlereport= {weather.report[0]}/>
            </button>
        </div>
    )
}

