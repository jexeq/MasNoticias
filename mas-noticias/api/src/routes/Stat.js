const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/", async function ( res, req, next ) {

    try {
        var allStats = await Stat.findAll({include:[
            {model: Report, attributes:["id", "title1"]},
             {model: Section}
            ]})
        return res.send(allStats)     

    } catch (err) {
        next(err)}
})

router.get("/:reportId", async function ( res, req, next ) {
    var reportId = req.params.reportId
    try {
        var reportStat = Report.findByPk(reportId, {include:[{model: Stat}]})

        return res.send(reportStat)     

    } catch (err) {
        next(err)}
})

router.delete("/:statId", async function ( req, res, next) {
    const {statId} = req.params; 
    try {
        Stat.destroy({where:{id: statId}});

        return res.send("Se eliminó la estadística");
    } catch(err) {
        next(err)}
})

module.exports = router;