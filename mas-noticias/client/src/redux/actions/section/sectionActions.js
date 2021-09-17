import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getSections = () => {
    return async  (dispatch) => {
        const res = await axios.get('/section/')
        return dispatch({ type: TYPES.GET_SECTIONS, payload: res.data })
    }
}

export const createSections = (section) => {
    return async  (dispatch) => {
        const res = await axios.post('/section/', section)
        return dispatch({ type: TYPES.CREATE_SECTION, payload: res.data })
    }
}

export const deleteSections = (sectionId) => {
    return async  (dispatch) => {
        const res = await axios.delete('/section/' + sectionId)
        return dispatch({ type: TYPES.CREATE_SECTION, payload: res.data })
    }
}