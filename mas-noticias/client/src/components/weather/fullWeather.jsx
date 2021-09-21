
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import "./weather.css";

export default function FullWeather () {

    const weather = useSelector( state=> state.weatherReducer.weather)

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <table className="d-table-cell ">
                <thead>
                    <tr>
                        <th className="th">hora</th>
                        <th className="th">fecha</th>
                        <th className="th">temperatura</th>
                        <th className="th">icono</th>
                        <th className="th">humedad</th>
                        {/* <th>viento</th> */}
                    </tr>
                </thead>
                    {weather.report.length>0&&weather.report.map(e=>(
                        <tbody className="table table-hover table-bordered">
                            <tr>
                                <td>{e.dt_txt.split(" ")[1]}</td>
                                <td>{e.dt_txt.split(" ")[0]}</td>
                                <td>{Math.round(e.main.temp)} °C</td>
                                <td><img src={"http://openweathermap.org/img/wn/"+e.weather[0].icon+"@2x.png"} alt="none" /></td>
                                <td>{e.main.humidity}%</td>
                                {/* <td>{}</td> */}
                            </tr>
                        </tbody>
                    ))}
            </table>
        </div>
    )
}