import * as TYPES from "../../actionTypes";

const initialState = {
    video: {},
    videos: [],
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) { 
        
        case TYPES.GET_VIDEO_BY_ID: return { ...state, video: action.payload }
        case TYPES.GET_ALL_VIDEO: return { ...state, videos: action.payload }
        case TYPES.CREATE_VIDEO_REPORT: return  { ...state, video: action.payload }
        case TYPES.CHANGE_VIDEO_STATUS: return { ...state, video: action.payload}
        case TYPES.CHANGE_VIDEO_PRIORITY: return { ...state, video: action.payload}
        case TYPES.UPDATE_VIDEO_REPORT: return { ...state, video: action.payload}
        case TYPES.DELETE_VIDEO_REPORT: return { ...state, video: {} }
        default:                  return state;
    }
}

export default videoReducer;