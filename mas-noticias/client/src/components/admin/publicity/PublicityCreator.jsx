import { getAllPublicities, createPublicity } from "../../../redux/actions/publicity/publicityActions";
import { getUser } from '../../../redux/actions/user/userActions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router";
import DatePickerComponent from "../../utils/DatePicker";
import ReactFirebaseFileUpload from '../../fileUploader/FileUploader';
import './publicityCreator.css';

export default function PublicityCreator () {
    const history = useHistory();
    const dispatch = useDispatch();
    const storePublicities = useSelector( state => state.publicityReducer.publicities);
    const storeUser = useSelector( state => state.userReducer.user);
    const userId = localStorage.getItem("mas-noticias");
    const [loading, setLoading] = useState(true);

    const initial_state = {
        owner: "",
        init: "",
        end: "",
        priority: "",
        url: "",
        type: "",
        state:"",
        redirect: ""
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

    // var { owner, init, end, priority, url, type, state, redirect } = publicity;
    var { owner, redirect } = publicity;

    function ownerHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, owner: e.target.value})
    }

    function redirectHandler (e) {
        e.preventDefault();
        setPublicity({...publicity, redirect: e.target.value})
    }

    function initHandler (date) {
        setPublicity({...publicity, init: date.toString()})
    }

    function endHandler (date) {
        setPublicity({...publicity, end: date.toString()})
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
        setPublicity({...publicity, state: e.target.value})
    }

    function urlHandler (urlArray) {
        
        setPublicity({...publicity, url: urlArray[0]})
    }

    function createPublicityHandler() {
        if(publicity.owner&&publicity.init&&publicity.end&&publicity.priority !== null &&publicity.type&&publicity.state&&publicity.url){
            dispatch(createPublicity(
                {
                    publicity: publicity,
                    user: storeUser
                }
            ))
            setTimeout( ()=> {
                alert("se envió el formulario")
                history.push("/admin/publicity")
            }, 600)    
        }else{
            alert("todos los campos obligatorios deben ser completados")
        }
    }

    return !loading&&(
        <div className="main-cont-pc">
            <h1>Formulario de Creación de Publicidades</h1>
            <h3>Propietario de la Publicidad</h3>
            <input className='input-group-text' name='owner' id="owner" value={owner} type="text" placeholder='ingrese texto' onChange={ownerHandler}/>
            <label className='danger' hidden={publicity.owner}> *Campo Obligatorio </label>
            <hr />
            <h3>URL de redireccionamiento</h3>
            <input className='input-group-text' name='redirect' id="owner" value={redirect} type="text" placeholder='pegar la URL' onChange={redirectHandler}/>
            <p> La URL provista se utilizará para redirigir al usuario cuando haga click en la publicidad</p>
            <hr />
            <div>
                <h3>Seleccionar Fechas</h3>
                <label htmlFor="">Fecha de inicio</label>
                <DatePickerComponent setDate={initHandler}/>
                <label className='danger' hidden={publicity.init}> *Campo Obligatorio </label>
                <hr />
                <label htmlFor="">Fecha de fin</label>
                <DatePickerComponent setDate={endHandler}/>
                <label className='danger' hidden={publicity.end}> *Campo Obligatorio </label>
            </div>
            <hr />
            <div>
                <h3>Establecer Prioridad</h3>
                <select className="form-control" name="priority" id="priority" onChange={priorityHandler}>
                    <option key='00'value=""> -- seleccionar --</option>
                    <option key='1'value="1"> 1 </option>
                    <option key='2' value="2"> 2 </option>
                    <option key='3' value="3"> 3 </option>
                    <option key='4' value="4"> 4 </option>
                </select>
                <label className='danger' hidden={publicity.priority}> *Campo Obligatorio </label>
                <p> Cuanto mayor sea la prioridad, mayor será la exposición de la publicidad</p>
            </div>
            <hr />
            <div>
                <h3>Subir Imagen o Gif</h3>
                <span htmlFor="fileUploader" className='danger' hidden={publicity.url}> *Campo Obligatorio </span>
                <ReactFirebaseFileUpload id="fileUploader" storeImages={publicity.url} setStoreImages={urlHandler}/>
                <h5 className='danger'> Tener en cuenta el tipo de Publicidad!</h5>
            </div>
            <hr />
            <div className='container'>
                <h3> Seleccione el tipo Publicidad</h3>
                <br />
                <select className="form-control" name="type" id="type" onChange={typeHandler}>
                    <option value=""> - seleccionar - </option>
                    <option value="small"> - small - </option>
                    <option value="medium"> - medium - </option>
                    <option value="large"> - large - </option>
                    <option value="banner"> - banner - </option>
                </select>
                <label className='danger' hidden={publicity.type}> *Campo Obligatorio </label>
                <ul>
                    <li>El tipo "small" es una publicidad pequeña de 200x200 pixeles en cada noticia</li>
                    <li>El tipo "medium" es una publicidad mediana de 350x400 pixeles y se mostrara tanto en la página principal como en cada noticia</li>
                    <li>El tipo "large" es una publicidad grande de 750x750 pixeles y se mostrara tanto en la página principal como en cada noticia</li>
                    <li>El tipo "banner" es una publicidad alargada de 350x700 pixeles y se mostrara tanto en la pagina principal como en cada noticia</li>
                </ul>
            </div>
            <hr />
            <div>
                <h3> Seleccione el Estado Inicial de la Publicidad</h3>
                <select className="form-control" name="state" id="state" onChange={stateHandler}>
                    <option value=""> - seleccionar - </option>
                    <option value="active"> - activa - </option>
                    <option value="paused"> - pausada - </option>
                    <option value="finished"> - finished - </option>
                </select>
                <label className='danger' hidden={publicity.state}> *Campo Obligatorio </label>
            </div>
            <hr />
            <button className='btn btn-dark'onClick={createPublicityHandler}> Crear Publicidad </button>

        </div>
    )
}