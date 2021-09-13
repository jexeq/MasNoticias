const {Weather} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");
const {lte} = Op;
const Axios = require("axios");
const moment = require("moment");
const {OPEN_KEY} = process.env;


router.get("/", async function( req, res, next) {
    var rightNow = new Date()

    try {
        
        // var weatherReport = Weather.findOne({where: {
        //     date: {
        //         [lte]: 10800
        //     }
        // }})

        var weatherReport = await Weather.findOne()

        console.log("exite reporte?: ", weatherReport)

        if(weatherReport) {
            console.log("habia reporte previo")
            return res.send(weatherReport);
        }else {

            try {

                const newWeatherReport = await Axios.get("http://api.openweathermap.org/data/2.5/forecast?q=tucuman&units=metric&appid=fde32ee04ad23a59b670b9190df15d5c")
    
                console.log("respuesta de openWeather: " , newWeatherReport.data )
                try {

                    console.log("intentando crear nuevo reporte")
                    var newWeather = await Weather.create({
                        report: newWeatherReport.data,
                        date: rightNow
                    })

                    return res.send(newWeather)

                } catch (err) {
                    throw new Error("error al crear el reporte nuevo " , err)
                }

            } catch (err) {
                 throw new Error("error en la consulta de OpenWeather " , err)}
        }


    }catch(err){
        next(err)   
    }
})



module.exports = router;