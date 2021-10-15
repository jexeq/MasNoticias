import {useDispatch} from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import {findReports} from '../../redux/actions/report/reportActions';


export default function SearchBar () {
    const dispatch = useDispatch();
    const history = useHistory();
    const [toFind, setToFind] = useState("");

    function onChangeHandler(e) {
        // console.log("se buscará: ", e.target.value)
        setToFind(e.target.value)
    }

    function findReportsHandler (e) {
        
        history.push(`/reports/search/${toFind}`)
    }

    return (
        <div>
            <form onSubmit={findReportsHandler}>
                <input value={toFind} type="text" placeholder={"Escriba y presione ENTER"} onChange={onChangeHandler}/>
            </form>
        </div>
    )
}