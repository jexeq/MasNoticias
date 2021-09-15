import axios from 'axios';
import * as TYPES from "../actionTypes";

export const getUser = (id) => {
    return async  (dispatch) => {
        const res = await axios.get('/user/' + id)
        return dispatch({ type: TYPES.GET_USER, payload: res.data })
    }
}

export const getAllUser = () => {
    return async  (dispatch) => {
        const res = await axios.get('/user')
        return dispatch({ type: TYPES.GET_ALL_USER, payload: res.data })
    }
}

export const createUser = (user) => {
    return async  (dispatch) => {
        const res = await axios.post('/user', user)
        return dispatch({ type: TYPES.CREATE_USER, payload: res.data })
    }
}

export const deleteUser = (params) => {
    return async  (dispatch) => {
        const res = await axios.delete('/user', params)
        return dispatch({ type: TYPES.DELETE_USER, payload: res.data })
    }
}



