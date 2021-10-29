

export default function checkVideoErrors (video, tag, section) {

    var error = false;
    if(!video.title1) {
        alert("No hay titulo")
        error = true;
    }
    if(!video.title2) {
        alert("No hay titulo 2")
        error = true;
    }
    if(!video.video) {
        alert("No hay ID del video")
        error = true; 
    }
    if(!tag?.id) {
        alert("No se seleccionó etiqueta")
        error = true;
    }
    if(!section?.id) {
        alert("No se seleccionó Sección")
        error = true;
    }

    return error;
}