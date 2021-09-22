
import './fullReport.css';

export default function FullReportCard (report) {
    const {title1, title2, footer1, footer2, footer3, paragraph1, paragraph2, paragraph3, photo1, photo2, photo3} = report;
    return (
        <div className="report-container">
            
            <h1>{title1}</h1>
            <br />
            <h2>{title2}</h2>
            <br />
            {photo1&&(
                <div className='img-container'>
                    <img className='main-img'src={photo1} alt="sin imagen"/>
                    <span>{footer1}</span>
                </div>)}
            <br />
            <div dangerouslySetInnerHTML={{__html: paragraph1}}></div>
            {photo2&&(<div>
                        <img src={photo2} alt="sin imagen" />
                        <p>{footer2}</p>
                    </div>)}
            <br />
            {paragraph2&&<p>{paragraph2}</p>}
            {photo3&&photo3.forEach(e=> {return (<div>
                        <img src={e} alt="sin imagen" />
                    </div>)})}
            <p>{footer3}</p>        
            <br />
            {paragraph3&&<p>{paragraph3}</p>}

        </div>
    )
}