import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './mediumReport.css';

export default function MediumReportCard (props) {

    const {report} = props;

    return report?.id ?(
        <div className='main-cont'>
            <NavLink className='navlink' to={`/report/${report.id}`}>
                <span className='med-span'>{report.tag.name}</span>
                <h4>{report.title1}</h4>
                <div className='med-img-cont'>
                    <img className='med-img' src={report.photo1} alt="esta debería ser una imagen" />
                </div>
            </NavLink>
        </div>
    ): <p>...loading</p>
}