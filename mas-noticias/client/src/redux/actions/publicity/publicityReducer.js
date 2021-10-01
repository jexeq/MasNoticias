import * as TYPES from "../../actionTypes";

const initialState = {
    publicity: [],
    publicites: []
};

const publicityReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_PUBLICITY: return { ...state, publicity: action.payload }
        case TYPES.GET_ALL_PUBLICITY: return { ...state, publicities: action.payload} 
        case TYPES.CREATE_PUBLICITY: return { ...state, publicity: action.payload }
        case TYPES.UPDATE_PUBLICITY: return { ...state, publicity: action.payload }
        case TYPES.DELETE_PUBLICITY: return { ...state, publicity: action.payload }
    
        default:                  return state;
    }
}

export default publicityReducer;