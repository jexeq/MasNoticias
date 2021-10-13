import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportsBySection, clearReports } from '../redux/actions/report/reportActions';
import MainReportCard from '../components/report/mainReportCard/MainReportCard';
import './reportBySection.css';

export default function ReportsBySection (props) {
    const {sectionId} = props.match.params;
    const dispatch = useDispatch();
    const storeReports = useSelector( state => state.reportReducer.reports);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(clearReports())
        dispatch(getReportsBySection(sectionId))
        console.log("se montó ReportsBySection")
        return ()=> dispatch(clearReports())
    },[])

    useEffect(()=>{
        console.log("storeReports", storeReports)
        if(storeReports) {

            setLoading(false);
        }
    },[storeReports])

    return !loading&&(
        <div className='container'>
            reportes
            {storeReports&&storeReports.map( r=> {
                return (
                <div  className='container'>
                    <MainReportCard report={r}/>
                </div>)
            })}
        </div>
    )
}