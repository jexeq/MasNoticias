import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {deletePublicity, getPublicity } from '../../../redux/actions/publicity/publicityActions';
import { useEffect, useState } from 'react';

export default function DeletePublicity (props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {publicityId} = props.match.params;
    const storePublicity = useSelector( state=> state.publicityReducer.publicity);
    const [ loading, setLoading ] = useState(true);

    function deleteHandler(e) {
        var confirmed = window.confirm("¿Está seguro de que desea eliminar la Publicidad?");
        if(confirmed) {
            dispatch(deletePublicity(storePublicity.id));
            alert("se eliminó la públicidad");
            history.push("/admin/publicity");
        }else{
            alert("será redireccionado");
            history.push("/admin/publicity")
        }
    }

    useEffect(()=> {
        dispatch(getPublicity(publicityId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect( ()=> {
        if(storePublicity?.id) {
            setLoading(false)
        }
    },[storePublicity])
    
    return !loading&&(
        <div className='container'>
            <div>
                <label > Propietario: </label>
                <h2>{storePublicity.owner}</h2>
                <label > estado: </label>
                <h4>{storePublicity.state}</h4>
            </div>
            <h4 className='danger'> ¡¡Cuidado!!</h4>
            <p> Esta acción no se podrá deshacer. Si elimina la publicidad, la misma será borrada <span>PERMANENTEMENTE</span> de la base de datos.</p>
            <button onClick={deleteHandler}> -ELIMINAR-</button>
        </div>
    )
}
