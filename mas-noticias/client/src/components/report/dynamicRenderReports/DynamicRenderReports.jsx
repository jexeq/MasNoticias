import MainReportCard from '../mainReportCard/MainReportCard';
import MediumReportCard from '../mediumReportCard/MediumReportCard';
import SmallReportCard from '../smallReportCard/SmallReportCard';
import BannerPublicityCard from '../../publicity/BannerPublicityCard';
import LargePublicityCard from '../../publicity/LargePublicityCard';
import './dynamicRender.css';

export default function DynamicRenderReports (props) {
    const {reports, publicity} = props;
    var pubIndex=0;
    var aux=[];
            
            reports.forEach((r, index) => {
                if(index === 0) {aux.push(<MainReportCard report={reports[0]}/>)};
                if(index%3 !== 0 || index === 3) {
                    if(parseInt(r.priority)>=2) {
                        aux.push(<MediumReportCard report={r}/>)
                    }else {
                        aux.push(<SmallReportCard report={r}/>)
                    }
                }else{
                    if(parseInt(r.priority)>=2) {
                        aux.push(<MediumReportCard report={r}/>)
                    }else {
                        aux.push(<SmallReportCard report={r}/>)
                    }
                    if(publicity[pubIndex]){
                        console.log("publicity[pubIndex]" ,publicity[pubIndex])
                        if(publicity[pubIndex].type === "banner") {
                            aux.push(<BannerPublicityCard publicity={publicity[pubIndex]}/>)
                            pubIndex++;
                        }
                        if(publicity[pubIndex].type === "large") {
                            aux.push(<LargePublicityCard publicity={publicity[pubIndex]}/>)
                            pubIndex++;
                        }
                        
                    }
                }
            })
   return (
       <div className='dynamic-cont'>

            {aux.map(e => e)}
       </div>)
}