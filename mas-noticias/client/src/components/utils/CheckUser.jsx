
export default function CheckUser (user) {
    if(user.type === "admin") {
        localStorage.setItem("admin", user.id)
    }

    switch (user.type) {
        case "admin": localStorage.setItem("admin", user.id)
        case "sudo": localStorage.setItem("sudo", user.id)
        case "editor": localStorage.setItem("editor", user.id)
        default: localStorage.setItem("mas-noticias", "guest")
    }

    return user.type;
}