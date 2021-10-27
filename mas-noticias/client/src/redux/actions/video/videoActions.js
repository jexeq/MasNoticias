import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getVideoById = (videoId) => {
    return async  (dispatch) => {
        const res = await axios.get('/video/' + videoId)
        return dispatch({ type: TYPES.GET_VIDEO_BY_ID, payload: res.data })
    }
}

export const getAllVideo = () => {
    return async  (dispatch) => {
        const res = await axios.get('/video/')
        return dispatch({ type: TYPES.GET_ALL_VIDEO, payload: res.data })
    }
}

export const getActiveVideo = () => {
    return async  (dispatch) => {
        const res = await axios.get('/video/active')
        return dispatch({ type: TYPES.GET_ALL_VIDEO, payload: res.data })
    }
}

export const createVideoReport = (data) => {
    return async  (dispatch) => {
        const res = await axios.post('/video', data)
        return dispatch({ type: TYPES.CREATE_VIDEO_REPORT, payload: res.data })
    }
}

export const changeVideoStatus = ({videoId, newStatus}) => {
    return async  (dispatch) => {
        const res = await axios.put(`/video/status?videoId=${videoId}&newStatus=${newStatus}`)
        return dispatch({ type: TYPES.CHANGE_VIDEO_STATUS, payload: res.data })
    }
}

export const changeVideoPriority = ({videoId, newPriority}) => {
    return async  (dispatch) => {
        const res = await axios.put(`/video/priority?videoId=${videoId}&newPriority=${newPriority}`)
        return dispatch({ type: TYPES.CHANGE_VIDEO_PRIORITY, payload: res.data })
    }
}

export const updateVideoReport = (data) => {
    return async  (dispatch) => {
        const res = await axios.put('/video', data)
        return dispatch({ type: TYPES.UPDATE_VIDEO_REPORT, payload: res.data })
    }
}

export const deleteVideoReport = (videoId) =>{
    return async  (dispatch) => {
        const res = await axios.delete(`/video/${videoId}`)
        return dispatch({ type: TYPES.DELETE_VIDEO_REPORT, payload: res.data })
    }
}
