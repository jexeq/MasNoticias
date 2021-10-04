import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPublicity, updatePublicityState, clearPublicity } from "../../../redux/actions/publicity/publicityActions";


export default function ChangePublicityState (props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const storePublicity = useSelector( state => state.publicityReducer.publicity);
    const { publicityId } = props.match.params;
    const [loading, setLoading] = useState(true)
    const [ selectedState, setSelectedState ] = useState()

    function updateStateHandler(e) {
        dispatch(updatePublicityState({
            id: storePublicity.id,
            state: selectedState
        }))
        
            alert("se envió el formulario");
            history.push("/admin/publicity");
        
    }

    function selectStateHanlder (e) {
        e.preventDefault();
        setSelectedState(e.target.value)
    }
    
    useEffect(()=>{
        dispatch(getPublicity(publicityId));
        return () => {
            dispatch(clearPublicity())
        }
    },[])

    useEffect(()=>{
        if(storePublicity?.id) {
            console.log("storePublicity")
            setLoading(false);
        }
    },[storePublicity])


    return !loading&&(
        <div className='container'>
            <div className='container'>
                <label> PROPIETARIO: </label>
                <h6>{storePublicity.owner}</h6>
                <label > estado actual: </label>
                <p>{storePublicity.state}</p>
            </div>
            <form onSubmit={updateStateHandler}>
                <select name="select-state" id="" onChange={selectStateHanlder}>
                    <option value=""> - seleccionar - </option>
                    <option value="active"> - Activa - </option>
                    <option value="paused"> - Pausada - </option>
                    <option value="finished"> - Finalizada - </option>
                </select>
                <hr />
                <button className='btn btn-dark' disabled={!selectedState}> Enviar </button>
            </form>
        </div>
    )
}