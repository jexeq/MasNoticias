import { NavLink } from "react-router-dom";
import './smallReportCard.css';

export default function SmallReportCard (props) {

    const {report} = props;

    return report?.id ?(
        <div >
            <NavLink className='small-rep-cont' to={`/report/${report.id}`}>
                <div className='small-img-cont'>
                    <img className='small-img' src={report.photo1} alt="esta debería ser una imagen" />
                </div>
                <p>{report.title1}</p>
            </NavLink>
        </div>
    ): <p>...loading</p>
}