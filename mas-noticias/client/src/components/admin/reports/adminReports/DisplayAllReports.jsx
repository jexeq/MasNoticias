import { getAllReports, clearReports } from '../../../../redux/actions/report/reportActions';
import { getUser } from '../../../../redux/actions/user/userActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangeReportStatus from './ChangeReportStatus';
import ChangeReportPriority from './ChangeReportPriority';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router';
import ReactPaginate from 'react-paginate';
import './displayAllReports.css';

export default function DisplayAllReports () {
    const history = useHistory();
    const dispatch = useDispatch();
    const storeReports = useSelector(state => state.reportReducer.reports);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias")
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null)
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 5;
    const pagesVisited = pageNumber * dataPerPage;
    const dataToDisplay = storeReports.slice(pagesVisited, pagesVisited + dataPerPage); 
    

    useEffect(()=>{
        dispatch(getAllReports())
        if(userId === "guest") {
            history.push("/not-found")
        }
        if (!storeUser){
            dispatch(getUser(userId))
        }
        return ()=>{dispatch(clearReports())}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(storeUser?.id){
            if (storeUser.type === "admin" || storeUser.type === "sudo" || storeUser.type === "editor"){
 
            }else {
                history.push("/not-found")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    function changePage ({selected}) {
        setPageNumber(selected)
    }

    return !loading&&(
        <div className='container align-items-c'>
            <h1>Listado de noticias</h1>
            <div>
                <table className="table">
                    <thead className="table-responsive">
                        <tr>
                            <th>check</th>
                            <th>Titulo</th>
                            <th className='hidden-row'>Secci??n</th>
                            <th className='hidden-row'>Creador</th>
                            <th>Estado</th>
                            <th>Prioridad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map( (r) => (
                            <tr key={r.id}>
                                <td>
                                    <input type="radio"
                                            name='select-report'
                                            value={r.id}
                                            onChange={(e)=>selectReport(e)}
                                            />
                                </td>
                                <td>{r.title1}</td>
                                <td className='hidden-row'>{r.section.name}</td>
                                <td className='hidden-row'>{r.user?.email}</td>
                                <td>{r.status}</td>
                                <td>{r.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ReactPaginate 
                className="d-flex align-content-center"
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount= {Math.ceil(storeReports.length / 5)}
                onPageChange={changePage}
                containerClassName='pagination-cont'
                activeClassName='pagination-active'
                disabledClassName='pagination-disabled'
            />
                <hr />
                {selectedReport&&(
                    <div>
                        {(storeUser.type === "admin"||storeUser.type === "sudo") && (<div>
                        <ChangeReportStatus report={selectedReport} />
                        <ChangeReportPriority report={selectedReport} />
                        </div>)}
                        <hr />
                        <NavLink to={`/admin/reports/edit-report/${selectedReport.id}`}>
                            <button className='btn btn-dark'>Editar el Contenido de la Noticia</button>
                        </NavLink>
                        <hr />
                    </div>)}
            </div>
        </div>
    )
}