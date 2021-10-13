import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportById, clearReports } from '../redux/actions/report/reportActions';
import  FullReportCard  from '../components/report/reportCard/fullReportCard';

export default function ReportDetail (props) {
    const dispatch = useDispatch()
    const { reportId } = props.match.params;
    const [loading, setLoading] = useState(true);
    const storeReport = useSelector( state=> state.reportReducer.report)

    useEffect( ()=> {
        dispatch(getReportById(reportId))
        return (
            () => {
                dispatch(clearReports())
            }
        )
    },[])

    useEffect( () => {
        if(storeReport.id){
            setLoading(false)
        }else{
            setLoading(true)
        }
    },[storeReport])

    return !loading&&(
        <div>
            <FullReportCard report={storeReport} section={storeReport.section} tag={storeReport.tag}/>
        </div>
    )
}