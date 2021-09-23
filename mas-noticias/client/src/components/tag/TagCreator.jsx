import { createTag, getAllTags,getTagsBySectionId } from "../../redux/actions/tag/tagActions";
import { getSections } from "../../redux/actions/section/sectionActions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import tagErrorControl from './tagErrorControl';

export default function TagCreator () {
    const dispatch = useDispatch();
    const storeSections = useSelector( state => state.sectionReducer.sections)
    const [loading, setLoading] = useState(true)
    const [selectedSection, setSelectedSection] = useState()
    const [sectionTags, setSectionTags] = useState()
    const [newTagName, setNewTagName] = useState("")

    useEffect(()=>{
        if(storeSections.length===0){ dispatch(getSections())}
    },[])

    useEffect(()=>{
        if(storeSections) {
            setLoading(false)
        }
    },[storeSections])

    useEffect(()=>{
        
    },[sectionTags])

    async function selectSectionHandler (e) {
        e.preventDefault()
        e.target.checked = true;
        setSelectedSection(e.target.value)
        
        let pickedSection = await storeSections.find( e=> e.id === selectedSection)
        if(pickedSection) {
            setSectionTags(pickedSection.tags)
        }
        console.log("sectionTags: " , sectionTags)
    }

    function tagInputHandler (e) {
        e.preventDefault();
        setNewTagName(e.target.value)
    }

    async function newTagHandler (e) {
        e.preventDefault()
        let existentTag = await tagErrorControl(newTagName, selectedSection)
        if(!existentTag) {
            dispatch(createTag(newTagName, selectedSection))
        }else {
            alert("la etiqueta ya existe para esta sección")
        }
    }

    return !loading&&(
        <div>
            <div>
                <form >
                <h3>Secciones existentes</h3>
                <br />
                <div>
                    {storeSections.map( (s, index) => 
                        <div key={s.id}>
                            {index===0?
                            <input type="radio" id={s.id} name="sections" value={s.id} checked onChange={ (e) => selectSectionHandler(e)} />:
                            <input type="radio" id={s.id} name="sections" value={s.id} onChange={ (e) => selectSectionHandler(e)} />
                            }
                            <label htmlFor={s.id}>{s.name}</label>
                        </div>
                        )}
                </div>

                </form>
                {selectedSection&& 
                    <div>
                        <h4>Etiquetas de la Sección</h4>
                        {sectionTags?.length>0?
                            <div>
                                {sectionTags.map( t => 
                                    <div key={t.id}>{t.name}</div>
                                    )}
                            </div>: <p>No hay Etiquetas en esta Sección</p>
                        }
                    </div>
                }
            </div>
            <div>
                <h4>Crear Nueva Etiqueta </h4>
                <input type="text" name="newTag" value={newTagName} onChange={tagInputHandler}/>
                <label hidden={newTagName.length>0 && newTagName.length>3}>La Etiqueta debe tener al menos 4 caracteres</label>
                <button onClick={newTagHandler}>Confirmar</button>
            </div>
        </div>
    )
}

