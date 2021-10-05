import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getAllPublicities = () => {
    return async  (dispatch) => {
        const res = await axios.get('/publicity/all-publicity')
        return dispatch({ type: TYPES.GET_ALL_PUBLICITY, payload: res.data })
    }
}

export const getActivePublicities = () => {
    return async  (dispatch) => {
        const res = await axios.get('/publicity/active')
        return dispatch({ type: TYPES.GET_ACTIVE_PUBLICITY, payload: res.data })
    }
}

export const getPublicity = (publicityId) => {
    return async (dispatch) => {
        const res = await axios.get(`/publicity/${publicityId}`)
        console.log("publicityActions, res.data" , res.data)
        return dispatch({ type: TYPES.GET_PUBLICITY_BY_ID, payload: res.data})
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

export const updatePublicityState = (body) => {
    return async  (dispatch) => {
        const res = await axios.put('/publicity/state', body)
        return dispatch({ type: TYPES.UPDATE_PUBLICITY_STATE, payload: res.data })
    }
}

export const updatePublicityPriority = (body) => {
    return async  (dispatch) => {
        const res = await axios.put('/publicity/priority', body)
        return dispatch({ type: TYPES.UPDATE_PUBLICITY_PRIORITY, payload: res.data })
    }
}

export const clearPublicity = () => {
    return (dispatch) => {
        return dispatch({ type: TYPES.CLEAR_PUBLICITY })
    }
}