import logo from '../../images/mas-noticias.png';
import "./NavBar.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherReport from '../weather/Weather';
import LogOutButton from '../authentication/SignOut';
import getSpanishDateOnly from '../utils/getSpanishDateOnly';
import { getWeather } from '../../redux/actions/weather/weatherActions';
import { getSections } from '../../redux/actions/section/sectionActions';
import { getUser } from '../../redux/actions/user/userActions';
import DisplaySections from '../section/DisplaySections';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    const dispatch = useDispatch();
    const storeUser = useSelector(state => state.userReducer.user)
    const storeSections = useSelector(state => state.sectionReducer.sections)
    const userId = localStorage.getItem("mas-noticias")

    useEffect(() => {
        dispatch(getWeather());
        dispatch(getSections());
        if (!storeUser && userId !== "guest") {
            dispatch(getUser(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="nav-container">
                <div className="container">
                    <NavLink to="/">
                        <img className="logo1" src={logo} alt="foto perdida" />
                    </NavLink>
                    <div className='spanish-date'>
                        {getSpanishDateOnly(new Date().toDateString(), { color: "white" , fontWeight: "bold", fontSize: "auto"})}
                    </div>
                </div>
                {!storeUser?.id && <NavLink className='logout-cont' to='/signin'>
                                        <button className='btn btn-dark btn-sm'>Ingresar </button>
                                    </NavLink>}
                <div className='btn-nav'>
                    {storeUser?.email}
                    {storeUser && userId && userId !== "guest" && <LogOutButton />}
                </div>
            </div>
            <div className='sections-cont'>
                {storeSections && <DisplaySections sections={storeSections} />}
            </div>
            
            <div className="editor-navBar">
                {(storeUser?.type === "admin" || storeUser?.type === "editor" || storeUser?.type === "sudo") && (
                    <div className="editor-navBar btn-group">
                        <NavLink className='btn-sm btn-primary' to="/create-report">Crear Noticia</NavLink>                      
                        <NavLink className='btn-sm btn-primary' to="/admin/reports">Noticias</NavLink>   
                    </div>
                )}
                {(storeUser?.type === "sudo") && (
                    <div className="editor-navBar btn-group">
                            <NavLink className='btn-sm btn-primary' to="/admin/users">Usuarios</NavLink>
                            <NavLink className='btn-sm btn-primary' to="/create-section">Secciones</NavLink>
                            <NavLink className='btn-sm btn-primary' to="/admin/publicity">Publicidades</NavLink>                  
                    </div>
                )}
            </div>
        </div>
    )
}