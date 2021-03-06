import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createSections, getSections } from "../../redux/actions/section/sectionActions";
import CheckUser from '../utils/CheckUser';
import "./section.css"
import { useHistory } from "react-router";

export default function SectionCreator() {
    const history = useHistory()
    const dispatch = useDispatch();
    const allSections = useSelector(state => state.sectionReducer.sections)
    const storeUser = useSelector(state => state.userReducer.user);
    const [userInput, setUserInput] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        dispatch(getSections());
        if (!CheckUser(storeUser)) {
            history.push('/not-found')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
    }, [allSections])

    function confirmSection() {
        var response = window.confirm("Confirmar Sección (no se podrá eliminar)")
        return response
    }

    function submitHandler(e) {
        if (!error) {
            dispatch(createSections({ name: userInput }))
        }
    }

    function checkError(data) {

        if (!data) {
            setError("la Sección no puede estar vacía")
        }

        if (data?.length > 1 && data?.length < 4) {
            setError("la Sección debe tener al menos 4 caracteres")
            return true;
        } else {
            setError("");
        }
        var prevSection = allSections.find(s => s.name.includes(data))
        console.log("PREVSECTION: " + prevSection)
        if (prevSection) {
            setError("la Sección ya existe")
            return true
        } else {
            setError("");
        }

        if (data?.length <= 1) {
            setError("")
        }


    }

    function onChangeHandler(e) {
        console.log("e.target.value", e.target.value)
        let capitalyzed;
        if (!e.target.value?.length === 0) {
            setUserInput("")
        }
        if (e.target.value.length > 1) {
            capitalyzed = e.target.value[0].toUpperCase() + e.target.value.slice(1);
        } else if (e.target.value.length === 1) {
            capitalyzed = e.target.value[0].toUpperCase()
        }

        console.log("capitalyzed", capitalyzed)
        setUserInput(capitalyzed);
        checkError(capitalyzed);

    }

    return (
        <div className="sections-main-container">
            <div>
                <h3>Secciones Existentes</h3>
                {allSections.length > 0 && allSections.map(s =>
                    <div key={s.id}>{s.name}</div>
                )}
            </div>
            <br />
            <form onSubmit={submitHandler}>
                <input type="text" value={userInput} onChange={onChangeHandler} placeholder="Nombre de la Sección" />
                <label >{error.length > 1 ? error : null}</label>
                <button type="submit" onClick={confirmSection} disabled={!userInput || error}>Confirmar</button>
            </form>

        </div>
    )
}