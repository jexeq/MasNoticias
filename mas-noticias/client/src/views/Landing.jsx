
import MainReportCard from '../components/report/mainReportCard/MainReportCard';
import MediumReportCard from '../components/report/mediumReportCard/MediumReportCard';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getweekReports } from "../redux/actions/report/reportActions";
import './landing.css';

export default function Landing () {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const storeReports = useSelector(state=>state.reportReducer.reports);

    useEffect(()=>{
        dispatch(getweekReports());
    },[])

    useEffect(()=>{
        if(!storeReports){
            dispatch(getweekReports());
        }else{
            setLoading(false);
        }
    },[storeReports]);

    return !loading&&(
        <div className="landing-cont">
            
            <div className='landing-body'>
                <div className='left-column'></div>
                <div className='center-column'>
                    <MainReportCard report={storeReports[0]}/>
                    <hr />
                    <div className='medium-report-cont'>

                    <MediumReportCard report={storeReports[1]}/>
                    <MediumReportCard report={storeReports[2]}/>
                    <MediumReportCard report={storeReports[3]}/>
                    </div>
                </div>
                <div className='rigth-column'></div>
            </div>
        </div>
    );
}