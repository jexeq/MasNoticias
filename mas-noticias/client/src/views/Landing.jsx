import SmallPublicityCard from '../components/publicity/SmallPublicityCard';
import SocialMediaShare from '../components/utils/SocialMediaShare';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getweekReports, clearReports } from "../redux/actions/report/reportActions";
import { clearPublicity, getActivePublicities } from '../redux/actions/publicity/publicityActions';
import filterPublicityByType from '../components/utils/filterPublicityByType';
import smallPubHere from '../components/publicity/smallPubHere';
import Paginator from '../components/utils/Paginator';
import './landing.css';

export default function Landing () {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [sortedPubs, setSortedPubs] = useState({})
    const storeReports = useSelector(state=>state.reportReducer.reports);
    const storePublicities = useSelector( state => state.publicityReducer.publicities); 
    const currentLocation = window.location;
    

    useEffect(()=>{
        dispatch(getweekReports());
        dispatch(getActivePublicities());
        return ()=> {
            dispatch(clearReports());
            dispatch(clearPublicity())};
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
                    
                    {storeReports&&storePublicities&&<Paginator reports={storeReports} publicity={storePublicities}/>}

                </div>
                <div className='rigth-column'>
                    {sortedPubs?.smallPublicities[0] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[0]}/>: smallPubHere()}
                    {sortedPubs?.smallPublicities[1] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[1]}/>: smallPubHere()}
                </div>
            </div>
        </div>
    );
}