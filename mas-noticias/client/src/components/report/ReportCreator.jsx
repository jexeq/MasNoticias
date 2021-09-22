import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from '../../redux/actions/report/reportActions'
import  ControlledEditor  from './TextEditor';
import ReactFirebaseFileUpload from '../fileUploader/FileUploader';
import './reportCreator.css';

export default function ReportCreator () {
    const dispatch = useDispatch();

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
        photo3: '',
        footer3: '',
        date: ''
    }

    var [reportBody, setReportBody] = useState(initial_state);
    var [paragraph1, setParagraph1] = useState();
    var [photo1, setphoto1] = useState([]);

    var {title1, title2, footer1, footer2, footer3} = reportBody;

    function onChangeHandler (e) {
        e.preventDefault();
        setReportBody({
            ...reportBody , [e.target.name]:e.target.value
        })
        console.log("reportBody: " ,reportBody )
    } 

    return (
        <div>
            <form >
                <div className='form-container'>
                    <input type="text" placeholder="Título Principal" name="title1" value={title1} onChange={onChangeHandler}/>
                    <input type="text" placeholder="Título Secundario" name="title2" value={title2} onChange={onChangeHandler}/>
                    <div>
                        <label>Foto Principal</label>
                        <ReactFirebaseFileUpload storeImages={photo1} setStoreImages={setphoto1}/>
                        <br />
                        <input type="text" placeholder="Pie de Foto" name="footer1" value={footer1} onChange={onChangeHandler}/>
                    </div>
                    <br />
                    <div>
                        <ControlledEditor paragraph={paragraph1} setParagraph={setParagraph1}/>
                    </div>
                </div>
            </form>
            <br />
            <div>
                <h1>previsualizacion</h1>

                <div dangerouslySetInnerHTML={{__html: paragraph1}}></div>
            </div>
        </div>
    )
}