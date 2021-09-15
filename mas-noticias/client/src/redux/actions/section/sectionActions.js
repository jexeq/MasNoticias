import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getSections = () => {
    return async  (dispatch) => {
        const res = await axios.get('/sections/')
        return dispatch({ type: TYPES.GET_SECTIONS, payload: res.data })
    }
}

export const createSections = (section) => {
    return async  (dispatch) => {
        const res = await axios.post('/sections/', section)
        return dispatch({ type: TYPES.CREATE_SECTION, payload: res.data })
    }
}

export const deleteSections = (sectionId) => {
    return async  (dispatch) => {
        const res = await axios.delete('/sections/' + sectionId)
        return dispatch({ type: TYPES.CREATE_SECTION, payload: res.data })
    }
}