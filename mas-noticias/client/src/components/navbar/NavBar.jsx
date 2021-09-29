import logo from '../../images/mas-noticias.png';
import "./NavBar.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherReport from '../weather/Weather';
import LogOutButton from '../authentication/SignOut';
import CheckUser from '../utils/CheckUser';
import { getWeather } from '../../redux/actions/weather/weatherActions';
import { getUser } from '../../redux/actions/user/userActions';
import { NavLink } from 'react-router-dom';

export default function NavBar () {

    const dispatch = useDispatch();
    const [toFind, setToFind] = useState("")
    const weather = useSelector(state=>state.weatherReducer.weather.report)
    const storeUser = useSelector(state => state.userReducer.user)
    const userId = localStorage.getItem("mas-noticias")

        function onChangeHandler (e) {
                e.preventDefault();
                setToFind(e.target.value);
                console.log("toFind: " , toFind)
        }

    useEffect( ()=> {
        dispatch(getWeather());
        if(!storeUser&&userId!=="guest"){
            dispatch(getUser(userId));
        }
    },[])        

    return storeUser&&(
        <div>
            <div className="nav-container">
                <NavLink to="/">
                    <img className="logo1" src={logo} alt="image"/>
                </NavLink>
                
                {/* <div>
                    <form className="searchbar">
                    <input type="text" value={toFind} onChange={onChangeHandler}/>
                    <button type="submit">Buscar</button>
                    </form>
                </div> */}
                {/* {weather?<WeatherReport/>:<p>Loading...</p>} */}
                {!storeUser && <NavLink to='/signin'> 
                    <button className='btn btn-dark btn-nav btn-lg border-0 rounded-0'>Ingresar </button>
                </NavLink>}
                <div className='btn-nav'>{storeUser?.email}</div>
                {storeUser&&<LogOutButton/>}
            </div>
            {(storeUser.type === "admin" || storeUser.type === "editor" || storeUser.type === "sudo" )&&(
                <div className="editor-navBar">
                    <div className="editor-options">
                    <NavLink className='links' to="/create-report">Crear Noticia</NavLink>
                    </div>
                    <div className="editor-options">
                    <NavLink className='links' to="/admin/reports">Administrar Noticias</NavLink>
                    </div>
                </div>
            )}

        </div>
    )
}