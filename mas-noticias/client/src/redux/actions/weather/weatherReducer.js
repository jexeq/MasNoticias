import * as TYPES from "../../actionTypes";

const initialState = {
    weather: {},
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_WEATHER: return { ...state, weather: action.payload }
       
        default:                  return state;
    }
}

export default weatherReducer;