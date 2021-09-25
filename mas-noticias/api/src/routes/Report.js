const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/", function (req, res, next){

    try {
        
        var allReports = Report.findAll(
            {include:[
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email"]}
            ]}
        )

        res.status(200).json(allReports);

    } catch (err) {
        next(err);
    }
})

router.get("/:id", async function (req, res, next){
    let {id} = req.params;
    try{
        // var reportOk = await Report.findByPk(id, {include: [{model: User, attributes: ["id", "email"]},{model: Section, attributes:["id", "name"]}, {model: Tag, attributes:["id", "name"]}, {model: Stat}] })
        var reportOk = await Report.findByPk(id, {include: [{model: Section, attributes:["id", "name"]}, {model: Tag, attributes:["id", "name"]}, {model: Stat}] })
        // var reportOk = await Report.findByPk(id)
        console.log(reportOk)
        if(reportOk) {
            return res.send(reportOk);
        }else{
            throw new Error("no se encontro el reporte")
        }
    }catch(err) {
        next(err);
    }
})

router.post("/", async function(req, res, next) {

    const {user , report, section, tag} = req.body;

    const {title1, title2, photo1, footer1, paragraph1, photo2, footer2, paragraph2, paragraph3, photo3, footer3, date } = report;

    try {

       const [newReport, reportCreated] = await Report.findOrCreate(
            {where: {title1: title1},
            defaults: {
                title1: title1,
                title2: title2,
                photo1: photo1,
                footer1: footer1,
                paragraph1: paragraph1,
                photo2: photo2,
                footer2: footer2,
                paragraph2: paragraph2,
                paragraph3: paragraph3,
                photo3: photo3,
                footer3: footer3,
                date: date
            }
        })
     
        if(!reportCreated) {
            res.status(400).send("Ya existe un reporte con este título")
        }else {
            try {
                let sectionOk = await Section.findByPk(section.id)
                console.log("sectionOk es" ,sectionOk)
                if(sectionOk){

                    await sectionOk.addReport(newReport);
                }else{
                    return res.send("no se encontró la sección")
                }

            }catch(err) {return res.send(err)}


            try {
                let tagOk = await Tag.findByPk(tag.id)
                console.log("tagOk es" ,tagOk)
                if(tagOk){
                    await tagOk.addReport(newReport);
                }else{
                    return res.send("no se encontró la etiqueta")
                }
            }catch(err) {return res.send(err)}

            try {
                let userOk= await User.findByPk(user.id)
                console.log("userOk es" ,userOk)
                if(userOk){
                    await User.addReport(newReport);
                }else{
                    return res.send("no se encontró el usuario")
                }
            }catch(err) {return res.send(err)}

            const reportStat = Stat.create();

            await newReport.addStat(reportStat);
        }

        res.status(200).send("Reporte creado exitosamente");

    }catch (err) {
        next(err);
    }
})

router.delete("/:id", async function (req, res, next) {
    const {id} = req.params;

    try {
        await Report.destroy({where: {id: id}});

        res.send("Reporte eliminado");

    }catch (err) {
        next(err);
    }
})

module.exports = router;