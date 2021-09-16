import { getWeather } from '../../redux/actions/weather/weatherActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherCard from './weatherCard';
import "./weather.css";

export default function WeatherReport () {
    const dispatch = useDispatch();
    const weather = useSelector(state=>state.weatherReducer.weather)
    const [expand, setExpand] = useState(false)

    // console.log("weather" , weather.report[0])
    return (
        <div className="weather-main">
            <button className="weather-button">
                <WeatherCard singlereport= {weather.report[0]}/>
            </button>
        </div>
    )
}

