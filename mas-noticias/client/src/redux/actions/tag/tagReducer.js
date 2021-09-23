import * as TYPES from "../../actionTypes";

const initialState = {
    tags: [],
};

const tagReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_ALL_TAG: return { ...state, tag: action.payload }
        case TYPES.CREATE_TAG: return { ...state, tags: action.payload }
        case TYPES.DELETE_TAG: return { ...state, tags: action.payload }
        case TYPES.GET_TAG_BY_SECTION: return { ...state, tag: action.payload }
    
        default:                  return state;
    }
}

export default tagReducer;