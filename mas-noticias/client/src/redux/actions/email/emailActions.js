import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const sendEmailConfirmation = (user) => {
    return async (dispatch) => {
        const res = await axios.post('/mail/user' , user)
        return dispatch({ type: TYPES.ACCOUNT_CONFIRMATION_EMAIL, payload: res.data })
    }
}