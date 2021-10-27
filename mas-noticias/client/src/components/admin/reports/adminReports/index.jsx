import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckUser from "../../../utils/CheckUser";
import { useHistory } from "react-router";
import { useEffect } from "react";

export default function ReportTypeSelector () {
    const storeUser = useSelector( state => state.userReducer.user);
    const history = useHistory();
    
    useEffect(()=>{
        if(!CheckUser(storeUser)){
            history.push('/not-found')
        }
    })

    return (
        <div className='container d-flex align-items-center justify-content-center'>
            <NavLink className='btn btn-dark text-decoration-none' to='/admin/reports/draft'> Redacciones </NavLink>
            <NavLink className='btn btn-dark text-decoration-none' to='/admin/reports/video'> VideoNoticias </NavLink>
        </div>
    )
}