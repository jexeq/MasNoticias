import { getAllVideo } from '../../../../redux/actions/video/videoActions';
import { getUser } from '../../../../redux/actions/user/userActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangeVideoStatus from './ChangeVideoStatus';
import ChangeVideoPriority from './ChangeVideoPriority';
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router';
import ReactPaginate from 'react-paginate';
import './displayAllReports.css';

export default function DisplayAllVideos () {
    const history = useHistory();
    const dispatch = useDispatch();
    const storeVideos = useSelector(state => state.videoReducer.videos);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias")
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null)
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 5;
    const pagesVisited = pageNumber * dataPerPage;
    const dataToDisplay = storeVideos.slice(pagesVisited, pagesVisited + dataPerPage); 
    

    useEffect(()=>{
        dispatch(getAllVideo())
        if(userId === "guest" || !userId) {
            history.push("/not-found")
        }
        if (!storeUser){
            dispatch(getUser(userId))
        }
        // return ()=>{dispatch(clearReports())}
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
        if(storeVideos?.length > 0) {
            setLoading(false)
        }
    },[storeVideos])

    function selectReport(e) {
        var pickedReport = storeVideos.find(r => r.id===e.target.value)
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
                            <th className='hidden-row'>Sección</th>
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
                pageCount= {Math.ceil(storeVideos.length / 5)}
                onPageChange={changePage}
                containerClassName='pagination-cont'
                activeClassName='pagination-active'
                disabledClassName='pagination-disabled'
            />
                <hr />
                {selectedReport&&(
                    <div>
                        {(storeUser.type === "admin"||storeUser.type === "sudo") && (<div>
                        <ChangeVideoStatus video={selectedReport} />
                        <ChangeVideoPriority video={selectedReport} />
                        </div>)}
                        <hr />
                        <NavLink to={`/admin/videos/edit-video/${selectedReport.id}`}>
                            <button className='btn btn-dark'>Editar el Contenido del Video</button>
                        </NavLink>
                        <hr />
                    </div>)}
            </div>
        </div>
    )
}