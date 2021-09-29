
export default function concatImages (img1, img2, imgArr) {
    var aux= []
    console.log("concatImages: img1 es" , img1)
    console.log("concatImages: img2 es" , img2)
    console.log("concatImages: imgArr es" , imgArr)
    if(img1) {
        aux.push(img1);
        console.log("concatImages: entro al primer if" , aux)
        if(img2){
            aux.push(img2);
            console.log("concatImages: entro al segundo if" , aux)
            if(imgArr){
                let concatedAux = aux.concat(imgArr);
                console.log("concatImages: entro al tercer if" , concatedAux)
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