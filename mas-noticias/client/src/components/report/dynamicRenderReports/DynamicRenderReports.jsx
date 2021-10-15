import MainReportCard from '../mainReportCard/MainReportCard';
import MediumReportCard from '../mediumReportCard/MediumReportCard';
import SmallReportCard from '../smallReportCard/SmallReportCard';
import BannerPublicityCard from '../../publicity/BannerPublicityCard';
import MediumPublicityCard from '../../publicity/MediumPublicityCard';
import LargePublicityCard from '../../publicity/LargePublicityCard';
import filterPublicityByType from '../../utils/filterPublicityByType';
import './dynamicRender.css';

export default function DynamicRenderReports(props) {
    const { reports, publicity } = props;
    var pubIndex = 0;
    
    const sortedPubs = filterPublicityByType(publicity)

    
    //recibo 10 noticias
    return (
        <div className='dynamic-cont'>
            <MainReportCard report={reports[0]}/>
                    <hr />
                    <div className='medium-report-cont'>
                        <SmallReportCard report={reports[1]}/>
                        <SmallReportCard report={reports[2]}/>
                        <SmallReportCard report={reports[3]}/>
                    </div>
                    <hr />
                    <div>
                        {sortedPubs.bannerPublicities[0]? <BannerPublicityCard publicity={sortedPubs.bannerPublicities[0]}/> : <div> publicite aqui</div>}
                    </div>
                    <div className='medium-report-cont'>
                        <MediumReportCard report={reports[4]}/>
                        <MediumReportCard report={reports[5]}/>
                        <MediumReportCard report={reports[6]}/>
                    </div>
                    <div>
                        {sortedPubs?.largePublicities[0]? <LargePublicityCard publicity={sortedPubs.largePublicities[0]}/>: <div>largepubHere</div>}
                    </div>
                    
                    <div className='medium-report-cont'>
                        <MediumReportCard report={reports[7]}/>
                        <MediumReportCard report={reports[8]}/>
                        <MediumReportCard report={reports[9]}/>
                    </div>
                    
                    <div className='container pl-md-5'>
                        {sortedPubs?.mediumPublicities[0] ? <MediumPublicityCard publicity={sortedPubs.mediumPublicities[0]}/>:<div>mediumPubHere</div>}
                        {sortedPubs?.mediumPublicities[1] ? <MediumPublicityCard publicity={sortedPubs.mediumPublicities[1]}/>:<div>mediumPubHere</div>}
                    </div>
            {/* {aux.map(e => e)} */}
        </div>)
}