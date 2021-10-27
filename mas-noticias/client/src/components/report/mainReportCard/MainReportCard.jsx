
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import "./mainReport.css";

export default function MainReportCard (props) {
    
    const {report} = props
    const [loading, setLoading] = useState(true)

    
    useEffect(()=>{
        if(report) {
            setLoading(false)
        }else{
            setLoading(true)
        }
    },[report])

    return !loading?(
        <div className="main-report-container">
            <div className='text-cont'>
                <div className="tag-cont">
                    {report?.tag?.name}
                </div>
                <NavLink className='NavLink' to={`/report/${report?.id}`}>
                    <div className='NavLink'>{report?.title1}</div>
                </NavLink>
                <div className='title2-cont'>
                    <p>
                    {report?.title2}
                    </p>
                </div>
            </div>
            <div className='img-cont-r'>
                <img className='report-img' src={report?.photo1} alt="foto no disponible" />
            </div>
        </div>
    ): <span></span>
}