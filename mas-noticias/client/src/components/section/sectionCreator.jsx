import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createSections, getSections} from "../../redux/actions/section/sectionActions";
import "./section.css"

export default function SectionCreator () {
    const dispatch = useDispatch();
    const allSections = useSelector(state=>state.sectionReducer.sections)
    const [userInput, setUserInput] = useState("")
    const [error, setError] =useState("")

    useEffect(()=>{
        dispatch(getSections());
    },[])

    useEffect(()=>{
       
    },[allSections])

    
    function submitHandler (e) {
        if(!error){
            dispatch(createSections({name: userInput}))
        }
    }
    
    function checkError () {
        if(userInput.length>1&&userInput.length<4) {
            setError("la Sección debe tener al menos 4 caracteres")
            return true;
        }else{
            setError("");
        }
        var prevSection= allSections.find(s=>s.name === userInput)
        console.log("prevSection", prevSection)
        if(prevSection){
            setError("la Sección ya existe")
            return true
        }else {
            setError("");
        }
    }
    
    function onChangeHandler (e) {
        e.preventDefault();
        setUserInput(e.target.value);
        checkError();
    }

    return (
        <div className="sections-main-container">
            <div>
                <h3>Secciones Existentes</h3>
                {allSections.length>0 && allSections.map(s=>
                    (
                        <div>{s.name}</div>
                    ))}
            </div>
            <br />
            <form onSubmit={submitHandler}>
                <input type="text" value={userInput} onChange={onChangeHandler} placeholder="Nombre de la Sección"/>
                <label >{error}</label>
                <button type="submit">Confirmar</button>
            </form>

        </div>
    )
}