import { getAllPublicities, createPublicity } from "../../../redux/actions/publicity/publicityActions";
import { getUser } from '../../../redux/actions/user/userActions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import DatePickerComponent from "../../utils/DatePicker";
import ReactFirebaseFileUpload from '../../fileUploader/FileUploader';

export default function PublicityCreator () {
    const dispatch = useDispatch();
    const storePublicities = useSelector( state => state.publicityReducer.publicities);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias");
    const [loading, setLoading] = useState(true);

    const initial_state = {
        owner: "",
        init: "",
        end: "",
        priority: null,
        url: [],
        type: "",
        state:""
    }

    const [ publicity, setPublicity ] = useState(initial_state);

    useEffect(()=> {
        if(!storeUser?.id){
            dispatch(getUser(userId));
        }else{
            setLoading(false);
        }

    },[])

    useEffect( () => {
        console.log("publicity es: " , publicity)
    },[publicity])

    var { owner, init, end, priority, url, type, state } = publicity;

    function ownerHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, owner: e.target.value})
    }

    function initHandler (date) {
        setPublicity({...publicity, init: date})
    }

    function endHandler (date) {
        setPublicity({...publicity, end: date})
    }

    function priorityHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, priority: parseInt(e.target.value)})
    }

    function typeHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, type: e.target.value})
    }

    function stateHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, type: e.target.value})
    }

    function urlHandler (urlArray) {
        
        setPublicity({...publicity, url: urlArray[0]})
    }

    function createPublicity() {
        if(publicity.owner&&publicity.init&&publicity.end&&publicity.priority&&publicity.type&&publicity.state&&publicity.url){
            dispatch(createPublicity(
                {
                    publicity: publicity,
                    user: storeUser
                }
            ))
            setTimeout( ()=> {alert("se envió el formulario")}, 600)    
        }else{
            alert("todos los campos obligatorios deben ser completados")
        }
    }

    return !loading&&(
        <div>
            <label htmlFor="owner">Propietario de la Publicidad</label>
            <input name='owner' id="owner" value={owner} type="text" placeholder='ingrese texto' onChange={ownerHandler}/>
            <hr />
            <div>
                <label htmlFor="">Fecha de inicio</label>
                <DatePickerComponent setDate={initHandler}/>
                <label htmlFor="">Fecha de fin</label>
                <DatePickerComponent setDate={endHandler}/>
            </div>
            <hr />
            <div>
                <label htmlFor="priority">Establecer Prioridad</label>
                <select name="priority" id="priority" onChange={priorityHandler}>
                    <option key='00'value=""> -- seleccionar --</option>
                    <option key='0'value="0"> 0 </option>
                    <option key='1' value="1"> 1 </option>
                    <option key='2' value="2"> 2 </option>
                    <option key='3' value="3"> 3 </option>
                </select>
                <label htmlFor="priority"> Cuanto mayor sea la prioridad, mayor será la exposición de la publicidad</label>
            </div>
            <div>
                <ReactFirebaseFileUpload storeImages={publicity.url} setStoreImages={urlHandler}/>
            </div>
            <hr />
            <div>
                <label htmlFor="type"> Seleccione el tipo Publicidad</label>
                <select name="type" id="type" onChange={typeHandler}>
                    <option value=""> - seleccionar - </option>
                    <option value="small"> - small - </option>
                    <option value="medium"> - medium - </option>
                    <option value="large"> - large - </option>
                    <option value="banner"> - banner - </option>
                </select>
                <ul>
                    <li>El tipo "small" es una publicidad pequeña de 200x200 pixeles en cada noticia</li>
                    <li>El tipo "medium" es una publicidad mediana de 350x400 pixeles y se mostrara tanto en la página principal como en cada noticia</li>
                    <li>El tipo "large" es una publicidad grande de 750x750 pixeles y se mostrara tanto en la página principal como en cada noticia</li>
                    <li>El tipo "banner" es una publicidad alargada de 350x700 pixeles y se mostrara tanto en la pagina principal como en cada noticia</li>
                </ul>
            </div>
            <hr />
            <div>
                <label htmlFor="state"> Seleccione el Estado Inicial de la Publicidad</label>
                <select name="state" id="state" onChange={stateHandler}>
                    <option value=""> - seleccionar - </option>
                    <option value="active"> - activa - </option>
                    <option value="paused"> - pausada - </option>
                    <option value="finished"> - finished - </option>
                </select>
            </div>
            <hr />
            <button onClick={createPublicity}> Crear Publicidad </button>

        </div>
    )
}