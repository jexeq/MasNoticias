import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from '../../../redux/actions/report/reportActions'
import { getSections } from '../../../redux/actions/section/sectionActions';
import { getUser } from '../../../redux/actions/user/userActions';
import  ControlledEditor  from './TextEditor';
import ReactFirebaseFileUpload from '../../fileUploader/FileUploader';
import FullReportCard from '../reportCard/fullReportCard';
import checkReportErrors from './checkReportErrors';
import './reportCreator.css';

export default function ReportCreator () {
    const dispatch = useDispatch();
    const allSections = useSelector(state=>state.sectionReducer.sections);
    const storeUser = useSelector( state=> state.userReducer.user);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("mas-noticias")

    var initial_state = {
        title1: '',
        title2: '',
        photo1: '',
        footer1: '',
        paragraph1: '',
        photo2: '',
        footer2: '',
        paragraph2: '',
        paragraph3: '',
        photo3: [],
        footer3: '',
        date: ''
    }

    var [reportBody, setReportBody] = useState(initial_state);
    var [paragraph1, setParagraph1] = useState();
    var [paragraph2, setParagraph2] = useState();
    var [paragraph3, setParagraph3] = useState();
    var [images, setImages] = useState([]);
    var [section, setSection] = useState()
    var sectionOptions = [];

    var {title1, title2, footer1, footer2, footer3} = reportBody;

    function onChangeHandler (e) {
        e.preventDefault();
        setReportBody({
            ...reportBody , [e.target.name]:e.target.value
        })
    } 

    function onSelectHandler (e) {
        var selectedSection = document.getElementById("section").value;
        setSection(selectedSection);
        var preSelect = document.getElementById("section")
        var selectedSectionText = preSelect.options[preSelect.selectedIndex].text;
        console.log("option seleccionada: " ,selectedSectionText)
    }

    function onSubmitHandler (e) {
        e.preventDefault();
        if(!checkReportErrors(reportBody, section, storeUser)) {
            dispatch(createReport({
                user: storeUser,
                section: section,
                tag: null,
                report: reportBody
            }))
        }else{
            alert("Todos los Campos Obligatorios deben ser Completados")
        }
    }

    useEffect(()=>{
        dispatch(getSections())
        if(!storeUser) {
            dispatch(getUser(userId))
        }
    },[])

    useEffect(()=>{
        setReportBody({...reportBody, paragraph1: paragraph1})
    },[paragraph1])

    useEffect(()=>{
        setReportBody({...reportBody, paragraph2: paragraph2})
    },[paragraph2])

    useEffect(()=>{
        setReportBody({...reportBody, paragraph3: paragraph3})
    },[paragraph3])

    useEffect(()=>{
        setLoading(true)
        setReportBody({...reportBody, photo1: images[0], photo2: images[1], photo3: images.slice(2)})
        console.log("photo3 es: " , reportBody.photo3)
        setLoading(false)
    },[images])

    useEffect(()=>{
        if(allSections?.length >0) {
            allSections.forEach(s => {
                sectionOptions.push(s.name)
            });
            setLoading(false)
        }
    },[allSections])

    return !loading&&(
        <div className='main-container'>
            <form onSubmit={onSubmitHandler}>
                <div className='form-container'>
                    <h1>Formulario de creación de Noticias</h1>
                    <select  id="section" onChange={onSelectHandler}>
                        <option value="" defaultValue=" - Seleccionar - "> - Seleccionar - </option>
                        {allSections.map( (s, i)=>{
                            return (
                                <option key={s.id} name={s.name} value={s.id}>{s.name}</option>
                                )
                            })}
                    </select>
                    <label className="required-field">* Elegir Sección (campo obligatorio)</label>
                    <br />
                    <input type="text" placeholder="Título Principal" name="title1" value={title1} onChange={onChangeHandler}/>
                    <label className="required-field">* Título es un campo obligatorio</label>
                    <br />
                    <input type="text" placeholder="Título Secundario" name="title2" value={title2} onChange={onChangeHandler}/>
                    <label className="required-field">* Título 2 es un campo obligatorio</label>
                    <br />
                    <div>
                        <label>Imágenes</label>
                        <ReactFirebaseFileUpload storeImages={images} setStoreImages={setImages}/>
                        <br />
                        <p>La primera imagen será utilizada como principal</p>    
                    </div>
                    <br />
                    <div>
                        <label>Párrafo 1</label>
                        <ControlledEditor paragraph={paragraph1} setParagraph={setParagraph1}/>
                        <label className="required-field">* Campo Obligatorio</label>    
                    </div>
                    <div>
                        <label>Párrafo 2</label>
                        <ControlledEditor paragraph={paragraph2} setParagraph={setParagraph2}/>
                    </div>
                    <div>
                        <label>Párrafo 3</label>
                        <ControlledEditor paragraph={paragraph3} setParagraph={setParagraph3}/>
                    </div>
                    <br />        
                    <input type="text" placeholder="Pie de Foto 1" name="footer1" value={footer1} onChange={onChangeHandler}/>
                    <br />
                    <input type="text" placeholder="Pie de Foto 2" name="footer2" value={footer2} onChange={onChangeHandler}/>
                    <br />
                    <input type="text" placeholder="Pie de Foto 3" name="footer3" value={footer3} onChange={onChangeHandler}/>
                    <br />        
                </div>
                <div>
                    <button type="submit">Crear Noticia</button>
                </div>
            </form>
            <br />
            <div>
                <h2>previsualizacion</h2>
                <br />
                    {FullReportCard(reportBody)}
                
            </div>
        </div>
    )
}