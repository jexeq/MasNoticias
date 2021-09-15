import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getWeather = (id) => {
    return async  (dispatch) => {
        const res = await axios.get('/weather/')
        return dispatch({ type: TYPES.GET_WEATHER, payload: res.data })
    }
}