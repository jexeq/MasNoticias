import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createVideoReport } from "../../../../redux/actions/video/videoActions";
import TagCreator from "../../../tag/TagCreator";
import ControlledEditor from "../../../report/TextEditor";
import CheckUser from "../../../utils/CheckUser";
import { getSections } from "../../../../redux/actions/section/sectionActions";
import { getUser } from "../../../../redux/actions/user/userActions";
import getYouTubeID from 'get-youtube-id';
import MainVideoCard from '../../../videoReports/mainVideoCard/MainVideoCard';
import checkVideoErrors from "./checkVideoErrors";

export default function VideoReportCreator () {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = localStorage.getItem('mas-noticias')
    const storeUser = useSelector( state => state.userReducer.user);
    const allSections = useSelector(state=>state.sectionReducer.sections);
    const initial_state = {
        title1: "",
        title2: "",
        paragraph1: "",
        footer1: "",
        video: "",
        date: new Date()
    }
    const [videoReport, setVideoReport] = useState(initial_state);
    const [paragraph1, setParagraph1] = useState(videoReport.paragraph1);
    const [section, setSection] = useState();
    const [tag, setTag] = useState();
    const [error, setError] =useState(true);
    const [loading, setLoading] = useState(true);
    const [url, setUrl ] = useState("");
    var {title1, title2, video, footer1} = videoReport;
 
    function onSubmitHandler (e) {
        e.preventDefault();

            if(!checkVideoErrors(videoReport, tag, section)) {
                dispatch(createVideoReport({
                    userId: storeUser.id,
                    sectionId: section.id,
                    tagId: tag.id,
                    videoReport: videoReport
                }))
                setTimeout(()=>{
                    alert("se envió el formulario")
                    history.push("/admin/reports/video")}, 400)
            }else{
                alert("Todos los Campos Obligatorios deben ser Completados")
            }
        
    }

    function onChangeHandler (e) {
        e.preventDefault();
        setVideoReport({
            ...videoReport , [e.target.name]:e.target.value
        })
    }

    function getYTid (e) {   
        e.preventDefault(); 
        console.log("esto es url: ", url)
        setVideoReport({
            ...videoReport , video: getYouTubeID(url)
        })
        console.log("videoReport.video", videoReport.video)
    }

    useEffect(()=>{
        if(!allSections) {
            dispatch(getSections())
        }else{
            setLoading(false)
        }
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
        setVideoReport({...videoReport, paragraph1: paragraph1})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paragraph1])

    return !loading&&(
        <div className='container'>
            <form className='form-control' onSubmit={onSubmitHandler}>
                <div className='flex-sm-column align-content-center justify-content-center'>
                    <h1>Formulario de creación de Noticias con Video</h1>
                    <hr />
                    <label className="danger" hidden={section}>* Elegir Sección (campo obligatorio)</label>
                    <TagCreator higherSection={section} setHigherSection={setSection} higherTag={tag} setHigherTag={setTag}/>
                    {tag&&<label htmlFor="tag-selected">Etiqueta Seleccionada:</label>}
                    {tag&&<h5 id={"tag-selected"}>{tag.name}</h5>}
                    <hr />
                    <input className='input-group-text' type="text" placeholder="Título Principal" name="title1" value={title1} onChange={onChangeHandler}/>
                    <label className="danger" hidden={!(title1.length === 0)}>* Título es un campo obligatorio</label>
                    <hr />
                    <textarea  className='input-group-text' placeholder="Título Secundario" name="title2" value={title2} onChange={onChangeHandler}/>    
                    <label className="danger" hidden={!(title2.length === 0)}>* Título 2 es un campo obligatorio</label>
                    <hr />
                    <label>Párrafo 1</label>
                    <ControlledEditor className='input-group-text' paragraph={paragraph1} setParagraph={setParagraph1}/>    
                    <hr />
                    <input className='input-group-text' type="text" placeholder="Pie del Video" name="footer1" value={footer1} onChange={onChangeHandler}/>
                    <hr />
                    <div>
                        <input  className='input-group-text' type="text" placeholder="URL de Youtube" value={url} onChange={ e => setUrl(e.target.value)}/>
                        <label className="danger" hidden={!(url?.length === 0)}>* URL es un campo obligatorio</label>
                        <button className='btn btn-dark' hidden={!url} onClick={e => getYTid(e)}> Obtener Código de video </button>
                        <h6 className='mt-3' hidden={!videoReport?.video}>Código de Video: {videoReport?.video}</h6>
                    </div>
                    <hr />
                    <button className='btn btn-primary' type='submit'> Crear VideoNoticia</button>
                </div>
            </form>
            <hr />
            <div>
                <h2>Previsualizacion</h2>
                <MainVideoCard videoReport={videoReport} tagName={tag?.name}/>
            </div>
        </div>
    )
}