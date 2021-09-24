import { createTag, getAllTags,getTagsBySectionId } from "../../redux/actions/tag/tagActions";
import { getSections } from "../../redux/actions/section/sectionActions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import TagErrorControl from './tagErrorControl';
import capitalizeEntries from '../utils/capitalizeEntries';

export default function TagCreator (props) {
    // var higherSection= props.higherSection;
    var setHigherSection = props.setHigherSection;
    // var higherTag = props.higherTag;
    var setHigherTag = props.setHigherTag;
    const dispatch = useDispatch();
    const storeSections = useSelector( state => state.sectionReducer.sections)
    const [loading, setLoading] = useState(true)
    const [selectedSection, setSelectedSection] = useState(null)
    const [newTagName, setNewTagName] = useState("")

    useEffect(()=>{
         dispatch(getSections())
    },[])

    useEffect(()=>{
        if(storeSections) {
            setLoading(false)
        }
    },[storeSections])

    useEffect(()=>{
    },[selectedSection])

    useEffect(()=>{
    },[loading])

    async function selectSectionHandler (e) {
            e.preventDefault()
            
            if(e.target.value) {
                let pickedSection = storeSections.find(s => s.id === e.target.value)
                setSelectedSection(pickedSection)
                setHigherSection(pickedSection)   
                setHigherTag(null)        
            }else{
                setSelectedSection(null)
                setHigherTag(null)
            }
    }

    function tagInputHandler (e) {
        setNewTagName(e.target.value)
    }

    async function newTagHandler (e) {
        
        var capitalized = capitalizeEntries(newTagName)
        
        var existentTag = await TagErrorControl(capitalized, selectedSection.id)
        if(!existentTag && capitalized.length > 3) {
            dispatch(createTag(capitalized, selectedSection.id))
            setLoading(true)
            setSelectedSection(null)
            setNewTagName("")
            setTimeout(()=>{
                alert("Solicitud enviada")
                dispatch(getSections())
            }, 800)
        }else {
            alert("la etiqueta ya existe para esta sección")
        }
    }

    function pickTagHandler (e) {
        e.preventDefault()
        var pickedTag = selectedSection.tags.find( t => t.id === e.target.value)
        if(pickedTag) {
            setHigherTag(pickedTag)
        }else{
            setHigherTag(null)
        }
    }

    return !loading&&(
        <div>
            <div>
                <form >
                <h3>Secciones existentes</h3>
                <br />
                <select id="section" onChange={ (e) => selectSectionHandler(e)} >
                    <option key='noOption' value={null} defaultValue=' - seleccionar - '> - seleccionar - </option>
                    {storeSections.map( s => 
                            <option key={s.id} id={s.id} name={s.name} value={s.id}>{s.name}</option>
                        )}
                </select>

                </form>
                {selectedSection&& 
                    <div>
                        <h5>Etiquetas de la Sección {selectedSection.name}</h5>
                        {selectedSection.tags?.length>0 ?
                            <div>
                                {selectedSection?.tags?.map( t => 
                                    <button key={t.id} name={t.name} value={t.id} onClick={pickTagHandler}>{t.name}</button>
                                    )}
                            </div>: <p>No hay Etiquetas en esta Sección</p>
                        }
                    </div>
                }
            </div>
            <div>
                <h6>Crear Nueva Etiqueta </h6>
                <input type="text" name="newTag" value={newTagName} onChange={tagInputHandler}/>
                <label hidden={newTagName.length===0 || newTagName.length>3}>La Etiqueta debe tener al menos 4 caracteres</label>
                <button disabled={!selectedSection} onClick={newTagHandler}>Confirmar</button>
            </div>
        </div>
    )
}

