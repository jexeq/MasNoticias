import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReportPriority } from "../../../../redux/actions/report/reportActions";



export default function ChangeReportPriority(props) {
    const dispatch = useDispatch();
    const currentPriority = props.report.priority;
    const [newPriority, setnewPriority] = useState(currentPriority)
    const validPriority = [0, 1, 2, 3]

    function selectPriorityHandler (e) {
        setnewPriority(e.target.value)
    }

    function updatePriorityHandler (e) {
        dispatch(updateReportPriority(props.report.id, newPriority))
        setTimeout( ()=>{
            alert("Se envió el cambio la Prioridad")
        } , 600)
    }

    return <div>
        <h4>Cambiar Prioridad del Reporte</h4>
        <hr />
        <h5>Prioridad Actual: {currentPriority}</h5>
        <p>Las Prioridades van desde el 0 al 3, cuanto mayor sea la prioridad de una noticia, se mostrará primero que otras noticias</p>
        <form>
        <label htmlFor={props.report.id}>Seleccionar</label>
        <br />
        <select className='form-control' name="report-priority" id={props.report.id} onChange={selectPriorityHandler}>
            <option key="seleccionar" value="">--seleccionar--</option>
            {validPriority.map( (e, index) =>  {
                if(e!== currentPriority) {
                    return <option key={index} value={e}>{e}</option>
                }
            })}
        </select>
        <br />
        {currentPriority!==newPriority&& <button  className='btn btn-dark' onClick={updatePriorityHandler}>Cambiar Prioridad</button> }
        <hr />
        </form>

    </div>
}