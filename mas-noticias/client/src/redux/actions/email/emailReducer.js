import * as TYPES from "../../actionTypes";

const initialState = {
    sentMail:[],
    responseMail:[],
  };

const mailReducer = (state = initialState, action) => {
    switch (action.type) { 
       
        case TYPES.ACCOUNT_CONFIRMATION_EMAIL: return{
            ...state,
            sentMail:action.payload
        }
        case TYPES.CONTACT_EMAIL: return {
            ...state,
            sentMail: action.payload
        }
       
        default:                  return state;
    }
}

export default mailReducer; 