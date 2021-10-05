import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllPublicities, clearPublicity } from '../../../redux/actions/publicity/publicityActions';
import PublicityDetailCard from './publicityDetailCard';
import './publicityManager.css';


export default function PublicityManager () {

    const dispatch = useDispatch();
    const storePublicities = useSelector( state => state.publicityReducer.publicities);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias")
    const [ loading, setLoading] = useState(true);
    const [ selectedPublicity, setSelectedPublicity] = useState();

    function selectPublicityHandler(e) {
        
        var pickedPublicity = storePublicities.find(p => p.id===e.target.value)
        if(pickedPublicity){
            setSelectedPublicity(pickedPublicity)
        }else{
            setSelectedPublicity(null)
        }
    }

    useEffect(()=>{
        dispatch(getAllPublicities());
        return () => dispatch(clearPublicity());
    },[])

    useEffect(()=>{
        if(storePublicities) {
            setLoading(false)
        }
    },[storePublicities])



    return !loading?(
        <div>
                <h1>Administrar Publicidades</h1>

            <div className='pub-main-cont'>
                <div className="pub-actions-container">
                    <h4>Acciones</h4>
                    <hr />
                    <NavLink to='/admin/create-publicity'>
                        <button className='btn btn-dark'> Crear Nueva Publicidad </button>
                    </NavLink>
                    <hr />
                    {selectedPublicity&&<div>
                        <NavLink to={`/admin/publicity/update/${selectedPublicity.id}`}>
                            <button className='btn btn-dark'> Modificar Publicidad </button>
                        </NavLink>
                        <hr />
                        <NavLink to={`/admin/publicity/state/${selectedPublicity.id}`}>
                            <button className='btn btn-dark'> Cambiar el Estado de una Publicidad </button>
                        </NavLink>
                        <hr />
                        <NavLink to={`/admin/publicity/priority/${selectedPublicity.id}`}>
                            <button className='btn btn-dark'> Cambiar Prioridad de una Publicidad </button>
                        </NavLink>
                        <hr />
                        <NavLink to={`/admin/publicity/delete/${selectedPublicity.id}`}>
                        <button className='btn btn-dark'> Eliminar Publicidad </button>
                        </NavLink>
                    </div>}
                    
                    
                </div>
                <div className='container'>
                    <table className="table">
                        <thead className="table-responsive ">
                            <th> Propietario</th>
                            <th> Tipo </th>
                            <th> Estado </th>
                            <th> Prioridad </th>
                            <th> Seleccionar </th>
                        </thead>
                        <tbody >
                            {storePublicities.map( p => 
                                <tr key={p.id} className='table-hover'>
                                    <td>{p.owner}</td>
                                    <td>{p.type}</td>
                                    <td>{p.state}</td>
                                    <td>{p.priority}</td>
                                    <td>
                                        <input  name='select-publicity' type="radio" value={p.id} onChange={e=>selectPublicityHandler(e)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <hr />
                    {selectedPublicity&&<div>
                        {PublicityDetailCard(selectedPublicity)}
                    </div>}
                </div>
            </div>
        </div>
    ) : <div>...Loading</div>
}