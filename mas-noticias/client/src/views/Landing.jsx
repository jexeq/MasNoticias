
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
    var smallPublicities = [];
    var mediumPublicities = [];
    var largePublicities = [];
    var bannerPublicities = [];


    useEffect(()=>{
        dispatch(getweekReports());
        dispatch(getActivePublicities());
        return ()=> dispatch(clearPublicity());
    },[])

    useEffect(()=>{
        if(!storeReports){
            dispatch(getweekReports());
        }else{
            if(storePublicities) {
                let sortedPubs = filterPublicityByType(storePublicities)
                smallPublicities = sortedPubs.smallPublicities;
                mediumPublicities = sortedPubs.mediumPublicities;
                largePublicities = sortedPubs.largePublicities;
                bannerPublicities = sortedPubs.bannerPublicities;
                setLoading(false);
                console.log("Landing 40 - smallPublicities: " , smallPublicities)
            }
        }
    },[storeReports]);

    var currentWidth = window.screen.width;

    useEffect(()=> {
        console.log("width: " , window.screen.width)

    },[currentWidth])


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
                    {!loading && smallPublicities && <SmallPublicityCard publicity={smallPublicities[0]}/>}
                </div>
            </div>
        </div>
    );
}