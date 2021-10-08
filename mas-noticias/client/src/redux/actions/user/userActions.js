import axios from 'axios';
import * as TYPES from "../../actionTypes";

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

export const clearUser = () => {
    return (dispatch) => {
        return dispatch({type: TYPES.CLEAR_USER})
    }
}

export const updateUser = (user) => {
    return async  (dispatch) => {
        const res = await axios.put('/user', user)
        return dispatch({ type: TYPES.DELETE_USER, payload: res.data })
    }
}

export const getGoogleUser = (user) => {
    return async (dispatch) => {
        // console.log("tratando de despachar")
        try { 
            // console.log("entro al try")
            const res = await axios.get('/user/' + user.id)
            // console.log("esto es res")
            // console.log("googlereducer - respuesta del back: " ,res.data)
            if(res.data.email) {
                return dispatch({type: TYPES.GET_USER, payload: res.data})
            }else{

                // console.log("No encontro el usuario en la DB")
                const userNew = await axios.post('/user', user)
                // console.log("y esta es la respuesta del back al intentar crear usuario: " , userNew.data)
                return dispatch({ type: TYPES.CREATE_USER, payload: userNew.data })
            }

        } catch(err) {
            console.log("error en googleReducer: " , err)
        }
    }    
    
}

// export const getGoogleUser = (user) => {
//     return async (dispatch) => {
//         console.log("tratando de despachar")
//         try { const res = await axios.get('/user/' + user.id)
//         console.log("googlereducer - respuesta del back: " ,res.data)
//         if(res.data.email!==undefined) return dispatch({type: TYPES.GET_USER, payload: res.data})
//         } catch(err) {
//             console.log("No encontro el usuario en la DB")
//             const userNew = await axios.post('/user', user)
//             console.log("y esta es la respuesta del back al intentar crear usuario: " , userNew.data)
//             return dispatch({ type: TYPES.CREATE_USER, payload: userNew.data })
//         }
//     }    
    
// }

export const getFacebookUser = (user) => {
    return async (dispatch) => {
        try { const res = await axios.get('/user/' + user.id)
        console.log("facebookReducer - respuesta del back: " ,res.data)
        if(res.data.email!==undefined) return dispatch({type: TYPES.GET_USER, payload: res.data})
        } catch(err) {
            console.log("No encontro el usuario en la DB")
            const userNew = await axios.post('/user', user)
            console.log("y esta es la respuesta del back al intentar crear usuario: " , userNew.data)
            return dispatch({ type: TYPES.CREATE_USER, payload: userNew.data })
        }
    }    
    
}