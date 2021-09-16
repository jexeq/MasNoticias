import "./weatherCard.css";

export default function WeatherCard (props) {

    var {singlereport} = props;

    console.log("singlereport: " ,singlereport)
    console.log("dt_txt: " , singlereport.dt_txt)

    var day = singlereport.dt_txt.split(" ")[0].split("-")[2];
    var month =  singlereport.dt_txt.split(" ")[0].split("-")[1];
    var hour =  singlereport.dt_txt.split(" ")[1].split(":")[0];
    var icon = singlereport.weather[0].icon;
    var description = singlereport.weather.description
    return (
        <div className="weather-container">
            <img className="weather-icon" src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt={description} />
            <div className="weather-data">
            <div className="min-max">
                <div>Min {Math.round(singlereport.main.temp_min)}°C</div>
                <div>Max {Math.round(singlereport.main.temp_max)}°C</div>
            </div>
            <div>San Miguel de Tucumán</div>
            </div>

        </div>
    )
}