import { NavLink } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import './displaySections.css';
export default function DisplaySections (props) {
    const {sections} = props; 

    return (
        <div className='sections-cont'>
            <div className='searchbar-cont'>
                <SearchBar/>
            </div>
            
            {sections.map( s=> {
                return (
                    <NavLink key={s.id} className='btn btn-sm btn-outline-primary' to={`/sections/${s.id}`}>
                        {s.name}
                    </NavLink>
                )
            })}
        </div>
    )
}