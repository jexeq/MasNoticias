import { getWeather } from '../../redux/actions/weather/weatherActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import weatherCard from './weatherCard';

export default function WeatherReport () {
    const dispatch = useDispatch();
    const weather = useSelector(state=>state.weatherReducer.weather)
    const [expand, setExpand] = useState(false)

    return (
        <div>
            <button>
                <h3>El Tiempo</h3>
                <weatherCard singleReport= {weather.report[0]}/>
            </button>
        </div>
    )
}

