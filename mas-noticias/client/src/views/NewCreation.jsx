

import React from "react";
import { useState } from "react";


export default function NewCreation () {

    const initialState = {
        title1: "",
        title2: "",
        photo1: "",
        footer1: "",
        paragraph1: "",
        paragraph2: "",
        photo2: "",
        footer2: "",
        paragraph3: "",
        photo3: "",
        footer3: ""
    }

    const [state, setState] = useState(initialState)
    
    


    return (
        <div>
            <form >

                <input name="title1" value={title1} type="text" onChange={onCHangeHandler}
                >Titulo Principal</input>

                <input name="title2" value={title2} type="text" onChange={onCHangeHandler}
                >Titulo Secundario</input>

            </form>
        </div>
    )


}