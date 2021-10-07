
import MainReportCard from '../components/report/mainReportCard/MainReportCard';
import MediumReportCard from '../components/report/mediumReportCard/MediumReportCard';
import SmallPublicityCard from '../components/publicity/SmallPublicityCard';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getweekReports } from "../redux/actions/report/reportActions";
import { clearPublicity, getActivePublicities } from '../redux/actions/publicity/publicityActions';
import filterPublicityByType from '../components/utils/filterPublicityByType';
import './landing.css';

export default function Landing () {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const storeReports = useSelector(state=>state.reportReducer.reports);
    const storePublicities = useSelector( state => state.publicityReducer.publicities); 
    const [sortedPubs, setSortedPubs] = useState({})


    useEffect(()=>{
        dispatch(getweekReports());
        dispatch(getActivePublicities());
        return ()=> dispatch(clearPublicity());
    },[])

    useEffect(()=>{
        // if(!storeReports){
        //     dispatch(getweekReports());
        // }
        if(storePublicities) {
            setSortedPubs(filterPublicityByType(storePublicities))
        }
    },[storePublicities]);
    
    useEffect(()=>{
        if(sortedPubs){
            setLoading(false);
            console.log("Landing 40 - sortedPubs: " , sortedPubs)
        }
    },[sortedPubs])

    // var currentWidth = window.screen.width;

    // useEffect(()=> {
    //     console.log("width: " , window.screen.width)

    // },[currentWidth])


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
                <div className='rigth-column'>
                    {sortedPubs? <SmallPublicityCard publicity={sortedPubs.smallPublicities[0]}/>: <div>...loading</div>}
                </div>
            </div>
        </div>
    );
}