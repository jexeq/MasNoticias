const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/", async function( req, res, next) {
    try {
        var allSections = await Section.findAll({include:{model: Tag}})

       return  res.send(allSections)

    }catch(err){
        next(err)   
    }
})

router.get("/:sectionId" , async function (req, res, next) {
    const {sectionId} = req.params;

    try {
        const sectionOk = Section.findByPk(sectionId, {include:{model: Tag}})
        if(sectionOk) {
            return res.send(sectionOk)
        }else{
            throw new Error("no se encontró la sección")
        }
    }catch (err) {

    }
})

router.post("/", async function(req, res, next) {
    const {tagName, sectionId} = req.body;

    try {
        var [newTag, previuosTag] = await Tag.findOrCreate({
            where: {name: tagName},
            default: {
                name: tagName
            }
        })

        if(!previuosTag) {
            throw new Error("ya existe la etiqueta con ese nombre")
        }

        var prevSection = await Section.findByPk(sectionId)

        if(!prevSection) {
            throw new Error ("No se encontró la sección indicada")
        }else {
           await prevSection.addTags(newTag)
        }

        return res.send("se creó una nueva etiqueta: ")

    }catch (err) {
        next(err);
    }
})

router.delete("/:tagId", async function (req, res, next) {

    const {tagId} = req.params;
    
    try {

        Tag.destroy({where:{id: tagId}})

        return res.send("Se eliminó la etiqueta");

    }catch (err) {
        next(err);
    }
})

module.exports = router;