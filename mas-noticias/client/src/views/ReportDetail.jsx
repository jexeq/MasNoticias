import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportById, clearReports } from '../redux/actions/report/reportActions';
import { getActivePublicities } from "../redux/actions/publicity/publicityActions";
import  FullReportCard  from '../components/report/reportCard/fullReportCard';

export default function ReportDetail (props) {
    const dispatch = useDispatch()
    const { reportId } = props.match.params;
    const [loading, setLoading] = useState(true);
    const storeReport = useSelector( state=> state.reportReducer.report);
    const storePublicities = useSelector( state => state.publicityReducer.publicities); 

    useEffect( ()=> {
        dispatch(getReportById(reportId))
        dispatch(getActivePublicities())
        return (
            () => {
                dispatch(clearReports())
            }
        )
    },[])

    useEffect( () => {
        if(storeReport.id&&storePublicities){
                setLoading(false);
        }
    },[storeReport, storePublicities])

    return !loading&&(
        <div>
            <FullReportCard publicities={storePublicities} report={storeReport} section={storeReport.section} tag={storeReport.tag}/>
        </div>
    )
}