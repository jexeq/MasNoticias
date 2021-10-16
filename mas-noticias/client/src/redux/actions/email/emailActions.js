import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const sendEmailConfirmation = (user) => {
    return async (dispatch) => {
        const res = await axios.post('/mail/user' , user)
        return dispatch({ type: TYPES.ACCOUNT_CONFIRMATION_EMAIL, payload: res.data })
    }
}

export const sendEmailConsult = (message) => {
    return async (dispatch) => {
    const res = await axios.post('/mail/contact', message)
    return dispatch({type: TYPES.CONTACT_EMAIL, payload: res.data })
    }    
        
}