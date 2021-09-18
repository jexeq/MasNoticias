import axios from "axios";

export async function callRegion () {

    try {
        var regions = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre&orden=nombre")
        console.log("regions: " , regions.data.provincias)
        return regions.data.provincias

    }catch(err){
        alert("se produjo un error cargando las provincias: ", err.message)
        return
    }
}

export async function callCity (region) {

    console.log("esto me llega como region: " , region)

    try {
        var city = await axios.get("https://apis.datos.gob.ar/georef/api/localidades?campos=nombre&orden=nombre&max=1000&provincia=" + region)
console.log("esto es lo que encuentra como ciudades: " , city.data.localidades)
        return city.data.localidades

    }catch(err){
        alert("se produjo un error cargando las regiones: ", err.message)
        return
    }
}

// "http://battuta.medunes.net/api/city/search/?region={REGION_NAME_HINT}&city={CITY_NAME_HINT}&key={YOUR_API_KEY}