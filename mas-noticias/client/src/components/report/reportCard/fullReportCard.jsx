import { useEffect } from 'react';
import './fullReport.css';

export default function FullReportCard (report, section) {
    // console.log("section dentro de full report card: " ,section)
    const {title1, title2, footer1, footer2, footer3, paragraph1, paragraph2, paragraph3, photo1, photo2, photo3} = report;
    

    return (
        <div className="report-container">
            {section&&section.name&&<div>{section.name}</div>}
            <br />
            {photo1&&(
                <div className='img-container'style={`background-image: url(${photo1});`}>
                    <div>{title1}</div>
                    
                </div>)}
                    <span>{footer1}</span>
                    <h2>{title2}</h2>
            <br />
            <div dangerouslySetInnerHTML={{__html: paragraph1}}></div>
            {photo2&&(<div className='img-container'>
                        <img className='main-img' src={photo2} alt="sin imagen" />
                        <p>{footer2}</p>
                    </div>)}
            <br />
            {paragraph2&&<div  dangerouslySetInnerHTML={{__html: paragraph2}}></div>}
            {photo3&&photo3.forEach(e=> {return (<div className='img-container'>
                        <img className='main-img' src={e} alt="sin imagen" />
                    </div>)})}
            <p>{footer3}</p>        
            <br />
            {paragraph3&&<div dangerouslySetInnerHTML={{__html: paragraph3}}></div>}

        </div>
    )
}