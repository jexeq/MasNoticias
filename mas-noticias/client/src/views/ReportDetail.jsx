import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportById, clearReports } from '../redux/actions/report/reportActions';
import { getActivePublicities } from "../redux/actions/publicity/publicityActions";
import  FullReportCard  from '../components/report/reportCard/fullReportCard';
import smallPubHere from '../components/publicity/smallPubHere';
import SmallPublicityCard from '../components/publicity/SmallPublicityCard';
import filterPublicityByType from '../components/utils/filterPublicityByType';
import './reportDetail.css';

export default function ReportDetail (props) {
    const dispatch = useDispatch()
    const { reportId } = props.match.params;
    const [loading, setLoading] = useState(true);
    const [sortedPubs, setSortedPubs] = useState({})
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect( () => {
        if(storeReport.id&&storePublicities){
                setSortedPubs(filterPublicityByType(storePublicities))
                setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[storeReport, storePublicities])

    return !loading&&(
        <div className="rep-det-cont">
            <div className='left-col'></div>
            <FullReportCard publicities={storePublicities} report={storeReport} section={storeReport.section} tag={storeReport.tag}/>
            <div>
                {smallPubHere()}
                {sortedPubs?.smallPublicities?.length>0&&sortedPubs.smallPublicities.map( p =>
                    <div key={p.id}>
                        <SmallPublicityCard publicity={p}/>
                    </div>
                    )}
            </div>
        </div>
    )
}