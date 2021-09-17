import "./weatherCard.css";

export default function WeatherCard (props) {

    var {singlereport} = props;

    
    var icon = singlereport.weather[0].icon;
    var description = singlereport.weather.description
    return (
        <div className="weather-container">
            <img className="weather-icon" src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt={description} />
            <div className="weather-data">
            <div className="min-max">
                <div>{Math.round(singlereport.main.temp)}°C</div>
                {/* <div>Max {Math.round(singlereport.main.temp_max)}°C</div> */}
            </div>
            <div className="tucuman">Tucumán</div>
            </div>

        </div>
    )
}