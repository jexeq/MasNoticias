import getSpanishDateOnly from '../../utils/getSpanishDateOnly';
import SocialMediaShare from '../../utils/SocialMediaShare';
import LargePublicityCard from '../../publicity/LargePublicityCard';
import BannerPublicityCard from '../../publicity/BannerPublicityCard';
import filterPublicityByType from '../../utils/filterPublicityByType';
import bannerPubHere from '../../publicity/bannerPubHere';
import './fullReport.css';

export default function FullReportCard(props) {
    const { title1, title2, date, footer1, footer2, footer3, paragraph1, paragraph2, paragraph3, photo1, photo2, photo3 } = props.report;
    const publicities = props.publicities;
    const tag = props.tag;
    const section = props.section;
    const sortedPubs = filterPublicityByType(publicities);

    return (
        <div className="report-container">
            {section && section.name && <h5 className='report-section'> - {section.name}</h5>}
            {tag && tag.name && <h5 className='report-section'> - {tag.name}</h5>}
            <div className='header-container'>
                <h1 className='title1'>{title1}</h1>
                {getSpanishDateOnly(new Date(date).toDateString(), {})}
                {photo1 && (
                    <div className='img-container'>
                        <img className='main-img' src={photo1} alt="sin imagen" />
                        <span className='img-foot'>{footer1}</span>
                    </div>)}
            </div>
            <h4 className='title2'>{title2}</h4>
            <div className='d-flex align-content-center'>
                <SocialMediaShare url={window.location.href} hashtag={tag?.name} header={title1} />
            </div>
            <br />
            <div className='paragraphs' dangerouslySetInnerHTML={{ __html: paragraph1 }}></div>
            {photo2 && (<div className='img-container'>
                <img className='main-img' src={photo2} alt="sin imagen" />
                <p>{footer2}</p>
            </div>)}
            <br />
            {paragraph2 && <div className='paragraphs' dangerouslySetInnerHTML={{ __html: paragraph2 }}></div>}
            <div>
                {sortedPubs.bannerPublicities[0]?<BannerPublicityCard publicity={sortedPubs.bannerPublicities[0]}/>:bannerPubHere()}
            </div>
            {photo3 && photo3.map(e => <div className='img-container'>
                <img className='second-img' src={e} alt="sin imagen" />
                <br />
            </div>)}
            <p>{footer3}</p>
            <br />
            {paragraph3 && <div className='paragraphs' dangerouslySetInnerHTML={{ __html: paragraph3 }}></div>}
            <div>
                {sortedPubs.largePublicities[0]?<LargePublicityCard publicity={sortedPubs.largePublicities[0]}/>:null}
            </div>
        </div>
    )
}