import * as TYPES from "../../actionTypes";

const initialState = {
    report: {},
    reports: [],
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_REPORT_BY_ID: return { ...state, report: action.payload }
        case TYPES.GET_ALL_REPORTS: return { ...state, reports: action.payload }
        case TYPES.GET_REPORTS_BY_SECTION: return { ...state, reports: action.payload }
        case TYPES.GET_REPORTS_BY_TAG: return { ...state, reports: action.payload }
        case TYPES.GET_WEEK_REPORTS: return { ...state, reports: action.payload}
        case TYPES.CREATE_REPORT: return  { ...state, report: action.payload }
        case TYPES.UPDATE_REPORT: return { ...state, report: action.payload} 
        case TYPES.UPDATE_REPORT_STATUS: return { ...state, report: action.payload}
        case TYPES.UPDATE_REPORT_PRIORITY: return { ...state, report: action.payload}
        case TYPES.DELETE_REPORT: return { ...state, report: {} }
        case TYPES.GET_WEEK_REPORTS: return {...state, reports: action.payload }
        case TYPES.CLEAR_REPORTS: return {...state, reports: [], report: {}}
        
        default:                  return state;
    }
}

export default reportReducer;
