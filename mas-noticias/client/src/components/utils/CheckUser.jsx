


export default function CheckUser (user) {
    
    const userId = localStorage.getItem("mas-noticias");
    var userOk = false

    
        if(userId !== "guest" && userId!==undefined) {
            if(user.type === "admin" || user.type === "sudo") {
                userOk = true;
            }
        }
    
    return userOk
}