
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function FullWeather () {

    const weather = useSelector( state=> state.weatherReducer.weather)

    return (
        <div>
            <table className="d-table-cell ms-5">
                <thead>
                    <tr>
                        <th>hora</th>
                        <th>fecha</th>
                        <th>temperatura</th>
                        <th>icono</th>
                        <th>humedad</th>
                        {/* <th>viento</th> */}
                    </tr>
                </thead>
                    {weather.report.length>0&&weather.report.map(e=>(
                        <tbody>
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