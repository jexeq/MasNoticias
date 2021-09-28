
export default function concatImages (img1, img2, imgArr) {
    var aux= []
    if(img1) {
        aux.push(img1);
        if(img2){
            aux.push(img2);
            if(imgArr){
                let concatedAux = aux.concat(imgArr);
                return concatedAux;
            }else{
                return aux
            }
        }else{
            return aux
        }
    }else{
        console.log("concatImages: No se pasaron imagenes como argumento")
        return aux;
    }
}