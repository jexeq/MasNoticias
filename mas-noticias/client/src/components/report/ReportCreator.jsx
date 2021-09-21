import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReport } from '../../redux/actions/report/reportActions'
import  ControlledEditor  from './TextEditor';

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
        gooter3: '',
        date: ''
    }

    var [reportBody, setReportBody] = useState(initial_state)

    return (
        <div>
            <form >
                <ControlledEditor/>
                {/* <input type="text" />
                <input type="text" />

                <input type="text" />
                <input type="text" />

                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />

                <input type="text" /> */}
            </form>
        </div>
    )
}