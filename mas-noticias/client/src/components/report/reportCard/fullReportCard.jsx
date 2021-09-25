import { useEffect } from 'react';
import './fullReport.css';

export default function FullReportCard (report, section, tag) {
    const {title1, title2, footer1, footer2, footer3, paragraph1, paragraph2, paragraph3, photo1, photo2, photo3} = report;
    // console.log("photo3 dentro de full report card: " ,photo3)
    
    
    return (
        <div className="report-container">
            {section&&section.name&&<h5 className='report-section'> - {section.name}</h5>}
            {tag&&tag.name&&<h5 className='report-section'> - {tag.name}</h5>}
                <div className='header-container'>

                <h1 className='title1'>{title1}</h1>
                {photo1&&(
                    <div className='img-container'>
                        <img className='main-img' src={photo1} alt="sin imagen" />    
                        <span className='img-foot'>{footer1}</span>
                    </div>)}
                </div>
            <h4 className='title2'>{title2}</h4>
            <div className='publicity-container'>
                <div>AQUI TIENE QUE IR EL COMPARTIDOR DE REDES</div>
            </div>
            <br />
            <div className='paragraphs' dangerouslySetInnerHTML={{__html: paragraph1}}></div>
            {photo2&&(<div className='img-container'>
                        <img className='main-img' src={photo2} alt="sin imagen" />
                        <p>{footer2}</p>
                    </div>)}
            <br />
            {paragraph2&&<div  className='paragraphs' dangerouslySetInnerHTML={{__html: paragraph2}}></div>}
            <div>
                <div>AQUI TIENE QUE IR UNA PUBLICIDAD</div>
            </div>
            {photo3&&photo3.map(e=> <div className='img-container'>
                        <img className='second-img' src={e} alt="sin imagen" />
                        <br />
                    </div>)}
            <p>{footer3}</p>        
            <br />
            {paragraph3&&<div className='paragraphs' dangerouslySetInnerHTML={{__html: paragraph3}}></div>}
            <div>
                <div>AQUI TIENE QUE IR UNA PUBLICIDAD</div>
            </div>        
        </div>
    )
}