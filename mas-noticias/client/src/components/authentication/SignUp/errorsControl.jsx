import axios from "axios";

export async function validateUserName (user_name) {

    try {
        console.log("Validando usuario " , user_name)
        const userPrev = await axios.get(`http://localhost:3001/user/username/${user_name}`)
        console.log("respuesta del back en Validacion: " , userPrev)
        if(userPrev.data!==false) {
            return true
        }else {
            return false
        }
    }catch (err) {
        console.log("atrapó un error : " , err)
        return false
    }

}

export async function validateUserEmail (email) {
    const emailPrev = await axios.get(`http://localhost:3001/user/useremail/${email}`)

    if(emailPrev.data.id) {
        return true
    } else {return false}
}