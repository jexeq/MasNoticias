import NavBar from "../components/navbar/NavBar"
import MainReportCard from '../components/report/mainReportCard/MainReportCard';

import './landing.css'

export default function Landing () {
    return (
        <div className="landing-cont">
            
            <div className='landing-body'>
                <div className='left-column'></div>
                <div className='center-column'>
                    <MainReportCard />

                </div>
                <div className='rigth-column'></div>
            </div>
        </div>
    )
}