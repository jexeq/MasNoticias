const {Weather} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");
const {lte} = Op;
const Axios = require("axios");
const moment = require("moment");
const {OPEN_KEY} = process.env;
const MonthToInt = require("../utils/MonthToInt");


router.get("/", async function( req, res, next) {
    
    var rightNow = new Date();
    var splitedNow = rightNow.toString().split(" ");
   

    var dayNumber = parseInt(splitedNow[2]);
    var monthNumber = MonthToInt(splitedNow[1]);
    var yearNumber = parseInt(splitedNow[3]);
    var hour = parseInt(splitedNow[4].split(":")[0]);
   

    try {
        var weatherReport = await Weather.findOne({where: {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hour: hour
        }})

       

       

        if(weatherReport) {
            
            return res.send(weatherReport);
        }else {

            try {

                const newWeatherReport = await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=tucuman&units=metric&appid=${OPEN_KEY}`)
    
               
                try {

                    
                    var newWeather = await Weather.create({
                        report: newWeatherReport.data.list,
                        hour: hour,
                        year: yearNumber,
                        month: monthNumber,
                        day: dayNumber
                        
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