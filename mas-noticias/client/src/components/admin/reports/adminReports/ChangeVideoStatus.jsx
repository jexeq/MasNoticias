import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeVideoStatus } from "../../../../redux/actions/video/videoActions";


export default function ChangeVideoStatus(props) {
    const dispatch = useDispatch();
    const currentStatus = props.video.status;
    const [newStatus, setNewStatus] = useState(currentStatus)
    const validStatus = ["pendiente", "publicado", "oculto"]

    function selectStatusHandler (e) {
        setNewStatus(e.target.value)
    }

    function updateStatusHandler (e) {
        dispatch(changeVideoStatus(props.video.id, newStatus))
        setTimeout( ()=>{
            alert("Se envió el cambio de Estado")
        } , 600)
    }

    return (
    <div>
        <h4>Cambiar estado del Video</h4>
        <hr />
        <h5>Estado Actual: {currentStatus}</h5>
        <form>
        
        <br />
        <select className='form-control' name="video-status" id={props.video.id} onChange={selectStatusHandler}>
        <option key="seleccionar" value="">--seleccionar--</option>
            {validStatus.map( (e, index) => {
                if(e!== currentStatus) {
                    return <option key={index} value={e}>{e}</option>
                }
            })}
        </select>
        <hr />
        {currentStatus!==newStatus&& <button className='btn btn-dark'onClick={updateStatusHandler}>Cambiar Estado</button> }
        </form>

    </div>)
}