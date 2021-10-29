import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportsBySection, clearReports } from '../redux/actions/report/reportActions';
import { getActivePublicities, clearPublicity } from "../redux/actions/publicity/publicityActions";
import MainReportCard from '../components/report/mainReportCard/MainReportCard';
import './reportBySection.css';

export default function ReportsBySection (props) {
    const {sectionId} = props.match.params;
    const dispatch = useDispatch();
    const storeReports = useSelector( state => state.reportReducer.reports);
    const storePublicities = useSelector( state => state.publicityReducer.publicities);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        dispatch(getActivePublicities())
        dispatch(getReportsBySection(sectionId))
        
        return ()=> {
            dispatch(clearPublicity());
            dispatch(clearReports());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sectionId])

    useEffect(()=>{
        
        if(storeReports) {
            if(storePublicities) {

                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[storeReports])

    return !loading&&(
        <div className='d-flex flex-column align-items-center justify-content-center'>  
            {storeReports&&storeReports.map( element => {
                return (
                <div className='d-flex flex-column align-items-center justify-content-center' key={element.id} className='container'>
                    <MainReportCard report={element}/>
                </div>)
            })}
        </div>
    )
}