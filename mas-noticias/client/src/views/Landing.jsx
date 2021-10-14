import DynamicRenderReports from '../components/report/dynamicRenderReports/DynamicRenderReports';
import MainReportCard from '../components/report/mainReportCard/MainReportCard';
import MediumReportCard from '../components/report/mediumReportCard/MediumReportCard';
import SmallReportCard from '../components/report/smallReportCard/SmallReportCard';
import SmallPublicityCard from '../components/publicity/SmallPublicityCard';
import LargePublicityCard from '../components/publicity/LargePublicityCard';
import BannerPublicityCard from '../components/publicity/BannerPublicityCard';
import MediumPublicityCard from '../components/publicity/MediumPublicityCard';
import SocialMediaShare from '../components/utils/SocialMediaShare';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getweekReports } from "../redux/actions/report/reportActions";
import { clearPublicity, getActivePublicities } from '../redux/actions/publicity/publicityActions';
import filterPublicityByType from '../components/utils/filterPublicityByType';
import smallPubHere from '../components/publicity/smallPubHere';
import './landing.css';

export default function Landing () {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [sortedPubs, setSortedPubs] = useState({})
    const storeReports = useSelector(state=>state.reportReducer.reports);
    const storePublicities = useSelector( state => state.publicityReducer.publicities); 
    const currentLocation = window.location;
    console.log(currentLocation);

    useEffect(()=>{
        dispatch(getweekReports());
        dispatch(getActivePublicities());
        return ()=> dispatch(clearPublicity());
    },[])

    useEffect(()=>{
        if(storePublicities) {
            setSortedPubs(filterPublicityByType(storePublicities))
        }
    },[storePublicities]);
    
    useEffect(()=>{
        if(sortedPubs){
            setLoading(false);
            // console.log("Landing 40 - sortedPubs: " , sortedPubs)
        }
    },[sortedPubs])

    return !loading&&(
        <div className="landing-cont">
            <SocialMediaShare url={currentLocation.href} header={"Más Noticias Tucumán"} hastag={"masnoticiastucuman"}/>
            <div className='landing-body'>
                <div className='left-column'></div>
                <div className='center-column'>
                    {/* <MainReportCard report={storeReports[0]}/>
                    <hr />
                    <div className='medium-report-cont'>
                        <SmallReportCard report={storeReports[0]}/>
                        <SmallReportCard report={storeReports[2]}/>
                        <SmallReportCard report={storeReports[3]}/>
                    </div>
                    <hr />
                    <div className='medium-report-cont'>
                        <MediumReportCard report={storeReports[1]}/>
                        <MediumReportCard report={storeReports[2]}/>
                        <MediumReportCard report={storeReports[3]}/>
                    </div>

                    <div>
                        {sortedPubs.bannerPublicities[0]? <BannerPublicityCard publicity={sortedPubs.bannerPublicities[0]}/> : <div> publite aqui</div>}
                    </div>
                    <div className='medium-report-cont'>
                        <MediumReportCard report={storeReports[1]}/>
                        <MediumReportCard report={storeReports[2]}/>
                        <MediumReportCard report={storeReports[3]}/>
                    </div>
                    <div>
                        {sortedPubs?.largePublicities[0]? <LargePublicityCard publicity={sortedPubs.largePublicities[0]}/>: <div>largepubHere</div>}
                    </div>
                    <div className='medium-report-cont'>
                        <MediumReportCard report={storeReports[1]}/>
                        <MediumReportCard report={storeReports[2]}/>
                        <MediumReportCard report={storeReports[3]}/>
                    </div>
                    <div>
                        {sortedPubs?.mediumPublicities[0] ? <MediumPublicityCard publicity={sortedPubs.mediumPublicities[0]}/>:<div>mediumPubHere</div>}
                        {sortedPubs?.mediumPublicities[1] ? <MediumPublicityCard publicity={sortedPubs.mediumPublicities[1]}/>:<div>mediumPubHere</div>}
                    </div> */}
                    {storeReports&&storePublicities&&<DynamicRenderReports reports={storeReports} publicity={storePublicities}/>}

                </div>
                <div className='rigth-column'>
                    {sortedPubs?.smallPublicities[0] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[0]}/>: smallPubHere()}
                    {sortedPubs?.smallPublicities[1] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[1]}/>: smallPubHere()}
                </div>
            </div>
        </div>
    );
}