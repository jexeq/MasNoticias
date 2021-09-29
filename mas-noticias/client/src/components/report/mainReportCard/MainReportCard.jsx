import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getweekReports } from "../../../redux/actions/report/reportActions";


import "./mainReport.css";

export default function MainReportCard () {
    const dispatch = useDispatch();
    const storeReports = useSelector( state => state.reportReducer.reports);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(storeReports?.length === 0) {
            dispatch(getweekReports())
        }
    },[])
    
    useEffect(()=>{
        if(storeReports?.length > 0) {
            setLoading(false)
        }

    },[storeReports])

    return !loading?(
        <div className="main-report-cont">
            <div className='text-cont'>
                <div className="tag-cont">
                    {storeReports[0].tag.name}
                </div>
                <NavLink className='NavLink' to={`/admin/reports/edit-report/${storeReports[0].id}`}>
                    <h2>{storeReports[0].title1}</h2>
                </NavLink>

                <div className='title2-cont'>
                    <p>
                    {storeReports[0].title2}
                    </p>
                </div>
            </div>
            <div className='img-cont'>
                <img  className='img-report' src={storeReports[0].photo1} alt="" />
            </div>
        </div>
    ): <span>Loading...</span>
}