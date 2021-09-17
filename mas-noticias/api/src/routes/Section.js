const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/", async function( req, res, next) {
    try {
        var allSections = await Section.findAll({include:[{model: Tag, attributes:["id", "name"]}]})
        // var allSections = await Section.findAll()

       return  res.send(allSections)

    }catch(err){
        next(err)   
    }
})

router.post("/", async function ( req, res, next) {
    const {name} = req.body;
    const nameOk =  name[0].toUpperCase() + name.slice(1)

    try {
        var [newSection, createdSection] = await Section.findOrCreate({
            where: {name: nameOk},
            defaults: {
                name:nameOk
            }
        })
        console.log("newSection " ,newSection)
        console.log("createdSection ", createdSection)

        if(!createdSection) {
            throw new Error("la Sección ya existe")
        }else {
            return res.send(newSection)
        }

    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async function ( req, res, next) {
    const {id} = req.params;

    try {
        await Section.destroy({where:{id:id}})

        return res.status(200).send("la Sección ha sido eliminada");

    }catch(err) {
        next(err);
    }
})

module.exports = router;
