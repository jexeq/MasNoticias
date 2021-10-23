import { NavLink } from "react-router-dom";
import './microReportCard.css';

export default function MicroReportCard (props) {
    const {report} = props;

    return report?.id ?(
        <div className='micro-rep-cont'>
            <NavLink  to={`/report/${report.id}`}>
                <div className='micro-rep-title'>{report.title1}</div>
            </NavLink>
        </div>
    ): <p></p>
}