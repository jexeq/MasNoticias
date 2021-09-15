import * as TYPES from "../types";

const initialState = {
    sections: [],
};

const sectionReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_SECTIONS: return { ...state, sections: action.payload }
        case TYPES.CREATE_SECTION: return { ...state, sections: action.payload }
        case TYPES.DELETE_SECTION: return { ...state, sections: action.payload }
    
        default:                  return state;
    }
}

export default reportReducer;