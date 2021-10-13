import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPublicity, updatePublicityPriority, clearPublicity } from "../../../redux/actions/publicity/publicityActions";


export default function ChangePublicityPriority (props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const storePublicity = useSelector( state => state.publicityReducer.publicity);
    const { publicityId } = props.match.params;
    const [loading, setLoading] = useState(true)
    const [ selectedPriority, setSelectedPriority ] = useState()

    function updateStateHandler(e) {
        dispatch(updatePublicityPriority({
            id: storePublicity.id,
            priority: selectedPriority
        }))
        
            alert("se envió el formulario");
            history.push("/admin/publicity");
        
    }

    function selectStateHanlder (e) {
        e.preventDefault();
        setSelectedPriority(e.target.value)
    }
    
    useEffect(()=>{
        dispatch(getPublicity(publicityId));
        return () => {
            dispatch(clearPublicity())
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(storePublicity?.id) {
            // console.log("storePublicity")
            setLoading(false);
        }
    },[storePublicity])


    return !loading&&(
        <div className='container'>
            <div className='container'>
                <label> PROPIETARIO: </label>
                <h6>{storePublicity.owner}</h6>
                <label > Prioridad actual: </label>
                <p>{storePublicity.priority}</p>
            </div>
            <form onSubmit={updateStateHandler}>
                <select name="select-state" id="" onChange={selectStateHanlder}>
                    <option value=""> - seleccionar - </option>
                    <option value={1}> - 1 - </option>
                    <option value={2}> - 2 - </option>
                    <option value={3}> - 3 - </option>
                    <option value={4}> - 4 - </option>
                </select>
                <hr />
                <button className='btn btn-dark' disabled={!selectedPriority}> Enviar </button>
            </form>
        </div>
    )
}