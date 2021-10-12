import logo from '../../images/mas-noticias.png';
import "./NavBar.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherReport from '../weather/Weather';
import LogOutButton from '../authentication/SignOut';
import getSpanishDateOnly from '../utils/getSpanishDateOnly';
import { getWeather } from '../../redux/actions/weather/weatherActions';
import { getSections } from '../../redux/actions/section/sectionActions';
import { getUser } from '../../redux/actions/user/userActions';
import DisplaySections from '../section/DisplaySections';
import { NavLink } from 'react-router-dom';

export default function NavBar () {

    const dispatch = useDispatch();
    // const [toFind, setToFind] = useState("")
    const weather = useSelector(state=>state.weatherReducer.weather.report)
    const storeUser = useSelector(state => state.userReducer.user)
    const storeSections = useSelector( state=> state.sectionReducer.sections)
    const userId = localStorage.getItem("mas-noticias")

   
    useEffect( ()=> {
        dispatch(getWeather());
        dispatch(getSections());
        if(!storeUser&&userId!=="guest"){
            dispatch(getUser(userId));
        }
    },[])        

    return (
        <div>
            <div className="nav-container">
                <div className="container">
                    <NavLink to="/">
                        <img className="logo1" src={logo} alt="image"/>
                    </NavLink>
                    {getSpanishDateOnly(new Date().toDateString()  ,{color: "white"})}
                </div>
                {/* {weather?<WeatherReport/>:<p>Loading...</p>} */}
                {!storeUser && <NavLink to='/signin'> 
                                     <button className='btn btn-dark btn-sm '>Ingresar </button>
                                </NavLink>}
                <div className='btn-nav'>
                    {storeUser?.email}
                    {storeUser&&userId&&<LogOutButton/>}
                </div>
            </div>
            <div>
                {storeSections&& <DisplaySections sections={storeSections}/>}
            </div>
            <div className="editor-navBar">
            {(storeUser?.type === "admin" || storeUser?.type === "editor" || storeUser?.type === "sudo" )&&(
                <div className="editor-navBar btn-group">
                    <div >
                        <NavLink className='btn btn-dark' to="/create-report">Crear Noticia</NavLink>
                    </div>
                    <div >
                        <NavLink className='btn btn-dark' to="/admin/reports">Noticias</NavLink>
                    </div>
                </div>
            )}
            {(storeUser?.type === "sudo")&&(
                <div className="editor-navBar btn-group">
                    <div >
                        <NavLink className='btn btn-dark' to="/admin/users">Usuarios</NavLink>
                    </div>
                    <div >
                        <NavLink className='btn btn-dark' to="/create-section">Secciones</NavLink>
                    </div>
                    <div >
                        <NavLink className='btn btn-dark' to="/admin/publicity">Publicidades</NavLink>
                    </div>
                </div>
            )}

            </div>

        </div>
    )
}