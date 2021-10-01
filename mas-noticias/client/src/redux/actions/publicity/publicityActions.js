import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getAllPublicities = () => {
    return async  (dispatch) => {
        const res = await axios.get('/publicity/all-publicity')
        return dispatch({ type: TYPES.GET_ALL_PUBLICITY, payload: res.data })
    }
}

export const createPublicity = (body) => {
    return async  (dispatch) => {
        const res = await axios.post('/publicity/', body)
        return dispatch({ type: TYPES.CREATE_PUBLICITY, payload: res.data })
    }
}

export const deletePublicity = (publicityId) => {
    return async  (dispatch) => {
        const res = await axios.delete('/publicity/' + publicityId)
        return dispatch({ type: TYPES.DELETE_PUBLICITY, payload: res.data })
    }
}

export const updatePublicity = (publicity) => {
    return async  (dispatch) => {
        const res = await axios.put('/publicity/' + publicity)
        return dispatch({ type: TYPES.DELETE_PUBLICITY, payload: res.data })
    }
}
