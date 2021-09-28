import { getweekReports } from '../../../../redux/actions/report/reportActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangeReportStatus from './ChangeReportStatus';
import ChangeReportPriority from './ChangeReportPriority';
import { NavLink } from "react-router-dom";

export default function DisplayAllReports () {
    const dispatch = useDispatch();
    const storeReports = useSelector(state => state.reportReducer.reports);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null)
    

    useEffect(()=>{
        dispatch(getweekReports())
    },[])

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
        <div>
            <h1>Listado de noticias</h1>
            <div>
                {selectedReport&&(
                    <div>
                        <ChangeReportStatus report={selectedReport} />
                        <ChangeReportPriority report={selectedReport} />
                        <NavLink to={`/admin/reports/edit-report/${selectedReport.id}`}>
                            <button>Editar el Contenido de la Noticia</button>
                        </NavLink>
                    </div>)}
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
                                            value={r.id}
                                            onChange={(e)=>selectReport(e)}
                                            />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}