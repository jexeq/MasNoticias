import { getAllReports, clearReports } from '../../../../redux/actions/report/reportActions';
import { getUser } from '../../../../redux/actions/user/userActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangeReportStatus from './ChangeReportStatus';
import ChangeReportPriority from './ChangeReportPriority';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router';

export default function DisplayAllReports () {
    const history = useHistory();
    const dispatch = useDispatch();
    const storeReports = useSelector(state => state.reportReducer.reports);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias")
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null)
    

    useEffect(()=>{
        dispatch(getAllReports())
        if(userId === "guest") {
            history.push("/not-found")
        }
        if (!storeUser){
            dispatch(getUser(userId))
        }
        return ()=>{dispatch(clearReports())}
    },[])

    useEffect(()=>{
        if(storeUser?.id){
            if (storeUser.type === "admin" || storeUser.type === "sudo" || storeUser.type === "editor"){
 
            }else {
                history.push("/not-found")
            }
        }
    },[storeUser])

    useEffect(()=>{
        if(storeReports?.length > 0) {
            setLoading(false)
        }
    },[storeReports])

    function selectReport(e) {
        var pickedReport = storeReports.find(r => r.id===e.target.value)
        if(pickedReport){
            setSelectedReport(pickedReport)
        }else{
            setSelectedReport(null)
        }
    }


    return !loading&&(
        <div className='container align-items-c'>
            <h1>Listado de noticias</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Sección</th>
                            <th>Creador</th>
                            <th>Estado</th>
                            <th>Prioridad</th>
                            <th>selector</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeReports.map( (r) => (
                            <tr key={r.id}>
                                <td>{r.title1}</td>
                                <td>{r.section.name}</td>
                                <td>{r.user.email}</td>
                                <td>{r.status}</td>
                                <td>{r.priority}</td>
                                <td>
                                    <input type="radio"
                                            name='select-report'
                                            value={r.id}
                                            onChange={(e)=>selectReport(e)}
                                            />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                {selectedReport&&(
                    <div>
                        {(storeUser.type === "admin"||storeUser.type === "sudo") && (<div>
                        <ChangeReportStatus report={selectedReport} />
                        <ChangeReportPriority report={selectedReport} />
                        </div>)}
                        <hr />
                        <NavLink to={`/admin/reports/edit-report/${selectedReport.id}`}>
                            <button>Editar el Contenido de la Noticia</button>
                        </NavLink>
                        <hr />
                    </div>)}
            </div>
        </div>
    )
}