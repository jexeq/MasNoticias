import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getAllTags = () => {
    return async  (dispatch) => {
        const res = await axios.get('/tag/')
        return dispatch({ type: TYPES.GET_ALL_TAG, payload: res.data })
    }
}

export const getTagsBySectionId = (sectionId) => {
    return async  (dispatch) => {
        const res = await axios.get(`/tag/${sectionId}`)
        return dispatch({ type: TYPES.GET_TAG_BY_SECTION, payload: res.data })
    }
}


export const createTag = (tagName, sectionId) => {
    return async  (dispatch) => {
        const res = await axios.post('/tag/', {tagName: tagName, sectionId: sectionId})
        return dispatch({ type: TYPES.CREATE_TAG, payload: res.data })
    }
}

export const deleteSections = (tagId) => {
    return async  (dispatch) => {
        const res = await axios.delete('/tag/' + tagId)
        return dispatch({ type: TYPES.DELETE_TAG, payload: res.data })
    }
}