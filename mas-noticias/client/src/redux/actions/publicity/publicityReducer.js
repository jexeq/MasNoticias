import * as TYPES from "../../actionTypes";

const initialState = {
    publicity: {},
    publicities: []
};

const publicityReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_PUBLICITY_BY_ID: return { ...state, publicity: action.payload }
        case TYPES.GET_ALL_PUBLICITY: return { ...state, publicities: action.payload} 
        case TYPES.GET_ACTIVE_PUBLICITY: return { ...state, publicities: action.payload}
        case TYPES.CREATE_PUBLICITY: return { ...state, publicity: action.payload }
        case TYPES.UPDATE_PUBLICITY_STATE: return { ...state, publicity: action.payload }
        case TYPES.DELETE_PUBLICITY: return { ...state, publicity: action.payload }
        case TYPES.CLEAR_PUBLICITY: return { ...state, publicity: {}, publicities: []}
        case TYPES.UPDATE_PUBLICITY_PRIORITY: return { ...state, publicity: action.payload}
        case TYPES.UPDATE_PUBLICITY_STATE: return { ...state, publicity: action.payload}
        case TYPES.UPDATE_PUBLICITY_GENERAL: return { ...state, publicity: action.payload}
        default:                  return state;
    }
}

export default publicityReducer;