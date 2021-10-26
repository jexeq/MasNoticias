import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createReport } from '../../../../redux/actions/report/reportActions'
import { getSections } from '../../../../redux/actions/section/sectionActions';
import { getUser } from '../../../../redux/actions/user/userActions';
import  ControlledEditor  from '../../../report/TextEditor'
import ReactFirebaseFileUpload from '../../../fileUploader/FileUploader';
import FullReportCard from '../../../report/reportCard/fullReportCard';
import checkReportErrors from '../../../report/checkReportErrors';
import TagCreator from '../../../tag/TagCreator';
import CheckUser from "../../../utils/CheckUser";
import './reportCreator.css';

export default function ReportCreator () {
    const history = useHistory()
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
        date: new Date()
    }

    var [reportBody, setReportBody] = useState(initial_state);
    var [paragraph1, setParagraph1] = useState();
    var [paragraph2, setParagraph2] = useState();
    var [paragraph3, setParagraph3] = useState();
    var [images, setImages] = useState([]);
    var [section, setSection] = useState();
    var [tag, setTag] = useState();
    var sectionOptions = [];

    var {title1, title2, footer1, footer2, footer3} = reportBody;

    function onChangeHandler (e) {
        e.preventDefault();
        setReportBody({
            ...reportBody , [e.target.name]:e.target.value
        })
    } 

    

    function onSubmitHandler (e) {
        e.preventDefault();
        if(!checkReportErrors(reportBody, section, storeUser)) {
            dispatch(createReport({
                user: storeUser,
                section: section,
                tag: tag,
                report: reportBody
            }))
            setTimeout(()=>{
                alert("se envió el formulario")
                history.push("/admin/reports")}, 600)
        }else{
            alert("Todos los Campos Obligatorios deben ser Completados")
        }
    }

    useEffect(()=>{
        if(!allSections) dispatch(getSections());
        if(!storeUser) {
            dispatch(getUser(userId))
        }else{
            if(!CheckUser(storeUser)){
                if(storeUser.type !== 'editor') {
                    history.push("/not-found")
                }
            }
        }
    })

    useEffect(()=>{
        setReportBody({...reportBody, paragraph1: paragraph1})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paragraph1])

    useEffect(()=>{
        setReportBody({...reportBody, paragraph2: paragraph2})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paragraph2])

    useEffect(()=>{
        setReportBody({...reportBody, paragraph3: paragraph3})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paragraph3])

    useEffect(()=>{
        setLoading(true)
        setReportBody({...reportBody, photo1: images[0], photo2: images[1], photo3: images.slice(2)})
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[images])

    useEffect(()=>{
        if(allSections?.length >0) {
            allSections.forEach(s => {
                sectionOptions.push(s.name)
            });
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allSections])

    return !loading&&(
        <div className='main-container'>
            <form onSubmit={onSubmitHandler}>
                <div className='form-container'>
                    <h1>Formulario de creación de Noticias</h1>
                    <hr />
                    <label className="required-field" hidden={section}>* Elegir Sección (campo obligatorio)</label>
                    <TagCreator higherSection={section} setHigherSection={setSection} higherTag={tag} setHigherTag={setTag}/>
                    {tag&&<label htmlFor="tag-selected">Etiqueta Seleccionada:</label>}
                    {tag&&<h5 id={"tag-selected"}>{tag.name}</h5>}
                    <br />
                    <input className='input-creator' type="text" placeholder="Título Principal" name="title1" value={title1} onChange={onChangeHandler}/>
                    <label className="required-field" hidden={!(title1.length === 0)}>* Título es un campo obligatorio</label>
                    <br />
                    <textarea  className='input-creator' placeholder="Título Secundario" name="title2" value={title2} onChange={onChangeHandler}/>    
                    <label className="required-field" hidden={!(title2.length === 0)}>* Título 2 es un campo obligatorio</label>
                    <br />
                    <div className='uploader-container'>
                        <label>Imágenes</label>
                        <ReactFirebaseFileUpload storeImages={images} setStoreImages={setImages}/>
                        <label className="required-field" hidden={!(images.length === 0)}>* La Noticia debe tener al menos una imagen</label>
                        <br />
                        <h5 hidden={(images.length === 0)}>La primera imagen será utilizada como principal</h5>    
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
                    <input className='input-creator' type="text" placeholder="Pie de Foto 1" name="footer1" value={footer1} onChange={onChangeHandler}/>
                    <br />
                    <input className='input-creator' type="text" placeholder="Pie de Foto 2" name="footer2" value={footer2} onChange={onChangeHandler}/>
                    <br />
                    <input className='input-creator' type="text" placeholder="Pie de Foto 3" name="footer3" value={footer3} onChange={onChangeHandler}/>
                    <br />        
                </div>
                <div>
                    <button type="submit">Crear Noticia</button>
                </div>
            </form>
            <br />
            {reportBody&&<div>
                <h2>previsualizacion</h2>
                <br />
                    <FullReportCard report={reportBody} section={section} tag={tag}/>
            </div>}
        </div>
    )
}