import SmallPublicityCard from '../components/publicity/SmallPublicityCard';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getweekReports, clearReports } from "../redux/actions/report/reportActions";
import { clearPublicity, getActivePublicities } from '../redux/actions/publicity/publicityActions';
import Footer from '../components/footer/Footer';
import filterPublicityByType from '../components/utils/filterPublicityByType';
import smallPubHere from '../components/publicity/smallPubHere';
import MicroReportCard from '../components/report/microReportCard/MicroReportCard';
import Paginator from '../components/utils/Paginator';
import './landing.css';

export default function Landing () {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [sortedPubs, setSortedPubs] = useState({})
    const storeReports = useSelector(state=>state.reportReducer.reports);
    const storePublicities = useSelector( state => state.publicityReducer.publicities); 
    

    useEffect(()=>{
        dispatch(getweekReports());
        dispatch(getActivePublicities());
        return ()=> {
            dispatch(clearReports());
            dispatch(clearPublicity())};
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(storePublicities) {
            setSortedPubs(filterPublicityByType(storePublicities))
        }
    },[storePublicities]);
    
    useEffect(()=>{
        if(sortedPubs){
            setLoading(false);
        }
    },[sortedPubs])

    return !loading&&(
        <div className="landing-cont">
            <div className='landing-body'>
                <div className='left-column'></div>
                <div className='center-column'> 
                    {storeReports&&storePublicities&&<Paginator reports={storeReports} publicity={storePublicities}/>}
                </div>
                <div className='rigth-column'>
                    {sortedPubs?.smallPublicities[0] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[0]}/>: smallPubHere()}
                    {sortedPubs?.smallPublicities[1] ? <SmallPublicityCard publicity={sortedPubs.smallPublicities[1]}/>: smallPubHere()}
                    {storeReports.map( (r, index) => index<10? <MicroReportCard key={r.id} report={r}/>:null)}
                </div>
            </div>
            <Footer />
        </div>
    );
}