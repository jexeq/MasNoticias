import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findReports } from "../redux/actions/report/reportActions";
import MediumReportCard from "../components/report/mediumReportCard/MediumReportCard";

export default function SearchReports (props) {
    const dispatch = useDispatch()
    const {find} = props.match.params;
    const storeReports = useSelector( state => state.reportReducer.reports);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        dispatch(findReports(find))
    },[])
    
    useEffect(()=> {
        if(storeReports) {
            setLoading(false);
        }
    },[storeReports])

    return !loading&&(
        <div>
            <h3>Noticias encontradas: </h3>
            <div>
                {storeReports&&
                 <div>
                     {storeReports.length}
                     <div>
                         {storeReports.map( r=> <MediumReportCard report={r} />)}
                     </div>
                 </div>
                 }
            </div>
        </div>
    )
}