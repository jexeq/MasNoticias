import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getTags = () => {
    return async  (dispatch) => {
        const res = await axios.get('/tag/')
        return dispatch({ type: TYPES.GET_TAG, payload: res.data })
    }
}

export const createTag = (tag) => {
    return async  (dispatch) => {
        const res = await axios.post('/tag/', tag)
        return dispatch({ type: TYPES.CREATE_TAG, payload: res.data })
    }
}

export const deleteSections = (tagId) => {
    return async  (dispatch) => {
        const res = await axios.delete('/tag/' + tagId)
        return dispatch({ type: TYPES.DELETE_TAG, payload: res.data })
    }
}