import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { updateVideoReport } from "../../../../redux/actions/video/videoActions";
import TagCreator from "../../../tag/TagCreator";
import ControlledEditor from "../../../report/TextEditor";
import CheckUser from "../../../utils/CheckUser";
import { getSections } from "../../../../redux/actions/section/sectionActions";
import { getUser } from "../../../../redux/actions/user/userActions";
import getYouTubeID from 'get-youtube-id';
import MainVideoCard from '../../../videoReports/mainVideoCard/MainVideoCard';
import { getVideoById } from "../../../../redux/actions/video/videoActions";

export default function VideoReportUpdater (props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = localStorage.getItem('mas-noticias')
    const storeUser = useSelector( state => state.userReducer.user);
    const allSections = useSelector( state=> state.sectionReducer.sections);
    const prevVideo = useSelector( state => state.videoReducer.video);
    const {videoId} = props.match.params;
    const initial_state = {
        id: prevVideo.id,
        title1: prevVideo.title1,
        title2: prevVideo.title2,
        paragraph1: prevVideo.paragraph1,
        footer1: prevVideo.footer1,
        video: prevVideo.video,
        date: prevVideo.date
    }
    const [videoReport, setVideoReport] = useState(initial_state);
    const [paragraph1, setParagraph1] = useState(prevVideo.paragraph1);
    const [section, setSection] = useState(prevVideo.section);
    const [tag, setTag] = useState(prevVideo.tag);
    const [error, setError] =useState(true);
    const [loading, setLoading] = useState(true);
    var {title1, title2, video, footer1} = videoReport;

    function onSubmitHandler (e) {
        e.preventDefault();
        if(videoReport.title1.length>0&&videoReport.title2.length>0&&videoReport.video.length>0&&tag.id&&section.id) {
            setError(false);
        }
        
        if(!error) {
            dispatch(updateVideoReport({
                userId: storeUser.id,
                sectionId: section.id,
                tagId: tag.id,
                videoReport: videoReport
            }))
            setTimeout(()=>{
                alert("se envi?? el formulario")
                history.push("/admin/reports/video")}, 600)
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
        setVideoReport({
            ...videoReport , video: getYouTubeID(e.target.value)
        })
    }

    useEffect(()=>{
        dispatch(getVideoById(videoId))
        if(!allSections) {
            dispatch(getSections())
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
    },[])

    useEffect( ()=>{
        if(prevVideo?.id) {
            setSection(prevVideo.section);
            setParagraph1(prevVideo.paragraph1);
            setTag(prevVideo.tag);
            setVideoReport(prevVideo);
            setLoading(false);  
        };
    },[prevVideo])

    useEffect(()=>{
        setVideoReport({...videoReport, paragraph1: paragraph1})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[paragraph1])

    return !loading&&(
        <div className='container'>
            <form className='form-control' onSubmit={onSubmitHandler}>
                <div className='flex-sm-column justify-content-center'>
                    <h1>Formulario de Actualizaci??n de Noticias con Video</h1>
                    <hr />
                    <label className="danger" hidden={section}>* Elegir Secci??n (campo obligatorio)</label>
                    <TagCreator higherSection={section} setHigherSection={setSection} higherTag={tag} setHigherTag={setTag}/>
                    {section&&<label htmlFor="section-selected">Secci??n Seleccionada:</label>}
                    {section&&<h5 id="section-selected">{section?.name} </h5> }
                    {tag&&<label htmlFor="tag-selected">Etiqueta Seleccionada:</label>}
                    {tag&&<h5 id={"tag-selected"}>{tag?.name}</h5>}
                    <hr />
                    <input className='input-group-text' type="text" placeholder="T??tulo Principal" name="title1" value={title1} onChange={onChangeHandler}/>
                    <label className="danger" hidden={!(title1?.length === 0)}>* T??tulo es un campo obligatorio</label>
                    <hr />
                    <textarea  className='input-group-text' placeholder="T??tulo Secundario" name="title2" value={title2} onChange={onChangeHandler}/>    
                    <label className="danger" hidden={!(title2?.length === 0)}>* T??tulo 2 es un campo obligatorio</label>
                    <hr />
                    <label>P??rrafo 1</label>
                    <ControlledEditor className='input-group-text' paragraph={paragraph1} setParagraph={setParagraph1}/>    
                    <hr />
                    <input className='input-group-text' type="text" placeholder="Pie del Video" name="footer1" value={footer1} onChange={onChangeHandler}/>
                    <hr />
                    <input  className='input-group-text' type="text" name='video' value={video} placeholder="URL de Youtube" onChange={getYTid}/>
                    <label className="danger" hidden={!(video?.length === 0)}>* URL es un campo obligatorio</label>
                    <hr />
                    <button className='btn btn-dark' type='submit'> Actualizar VideoNoticia</button>
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