import MainReportCard from '../mainReportCard/MainReportCard';
import MediumReportCard from '../mediumReportCard/MediumReportCard';
import SmallReportCard from '../smallReportCard/SmallReportCard';
import BannerPublicityCard from '../../publicity/BannerPublicityCard';
import MediumPublicityCard from '../../publicity/MediumPublicityCard';
import LargePublicityCard from '../../publicity/LargePublicityCard';
import './dynamicRender.css';

export default function DynamicRenderReports(props) {
    const { reports, publicity } = props;
    var pubIndex = 0;
    var aux = [];

    reports.forEach((r, index) => {
        if (index === 0) {
            aux.push(<MainReportCard key={r.id} report={reports[0]} />)
        } else {
            if (index % 3 !== 0 || index === 4) {
                if (parseInt(r.priority) >= 2) {
                    aux.push(<MediumReportCard key={r.id} report={r} />)
                } else {
                    aux.push(<SmallReportCard key={r.id} report={r} />)
                }
            } else {
                if (parseInt(r.priority) >= 2) {
                    aux.push(<MediumReportCard key={r.id} report={r} />)
                } else {
                    aux.push(<SmallReportCard key={r.id} report={r} />)
                }
                if (publicity[pubIndex]) {
                    
                    if (publicity[pubIndex].type === "banner") {
                        aux.push(<BannerPublicityCard publicity={publicity[pubIndex]} />)
                        pubIndex++;
                    }
                    if (publicity[pubIndex].type === "large") {
                        aux.push(<LargePublicityCard publicity={publicity[pubIndex]} />)
                        pubIndex++;
                    }
                    if (publicity[pubIndex].type === "medium") {
                        aux.push(<MediumPublicityCard publicity={publicity[pubIndex]} />)
                        pubIndex++;
                    }

                }
            }

        }
    })
    return (
        <div className='dynamic-cont'>
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
            {aux.map(e => e)}
        </div>)
}