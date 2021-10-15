import { NavLink } from "react-router-dom";
import './mediumReport.css';

export default function MediumReportCard (props) {

    const {report} = props;

    return report?.id ?(
        // <div className='card'>
        //     <NavLink  className='card-body' to={`/report/${report.id}`}>
        //         <span className='card-subtitle'>{report.tag.name}</span>
        //         <h4 className='card-title'>{report.title1}</h4>
        //         <div className='card-img'>
        //             <img className='' src={report.photo1} alt="esta debería ser una imagen" />
        //         </div>
        //     </NavLink>
        // </div>
        <div className='med-main-cont'>
            <span className='med-span'>{report.tag.name}</span>
            <NavLink className='navlink' to={`/report/${report.id}`}>
                <h4>{report.title1}</h4>
                <div className='med-img-cont'>
                    <img className='med-img' src={report.photo1} alt="esta debería ser una imagen" />
                </div>
            </NavLink>
    </div>
    ): <p>...loading</p>
}