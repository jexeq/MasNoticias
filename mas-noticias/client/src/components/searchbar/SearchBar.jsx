import { useState } from 'react';
import { useHistory } from 'react-router';

export default function SearchBar () {
    const history = useHistory();
    const [toFind, setToFind] = useState("");

    function onChangeHandler(e) {
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