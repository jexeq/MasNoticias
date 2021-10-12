import { NavLink } from "react-router-dom";
import './displaySections.css';
export default function DisplaySections (props) {
    const {sections} = props; 

    return (
        <div className='sections-cont'>
            {sections.map( s=> {
                return (
                    <NavLink className='btn btn-sm btn-outline-primary' to={`/sections/${s.id}`}>
                        {s.name}
                    </NavLink>
                )
            })}
        </div>
    )
}