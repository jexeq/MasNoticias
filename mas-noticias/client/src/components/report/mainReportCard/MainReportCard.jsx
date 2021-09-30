
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
        <div className="main-report-cont">
            <div className='text-cont'>
                <div className="tag-cont">
                    {report.tag.name}
                </div>
                <NavLink className='NavLink' to={`/report/${report.id}`}>
                    <h2>{report.title1}</h2>
                </NavLink>

                <div className='title2-cont'>
                    <p>
                    {report.title2}
                    </p>
                </div>
            </div>
            <div className='img-cont'>
                <img  className='img-report' src={report.photo1} alt="" />
            </div>
        </div>
    ): <span>Loading...</span>
}