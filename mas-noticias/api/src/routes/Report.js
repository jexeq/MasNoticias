const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/week_reports", async function (req, res, next){

    try {

        var allReports = await Report.findAll(
            {
            where: {
                // date: {
                //     [Op.gt]: new Date(new Date() - (24 * 60 * 60 * 1000 * 7)  )
                // },
                status: "publicado"
            },
            include:[
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email", "name", "lastname"]}
            ],
            order: [["priority", "DESC"], ["date", "DESC"]],
            limit: 20
        })
        
        return res.status(200).send(allReports);

    } catch (err) {
        next(err);
    }
})

router.get("/all-reports" , async function (req, res, next){
    try{
        const allReports = await Report.findAll(
            {include:[
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email", "name", "lastname"]}
            ],
            order: [["priority", "DESC"]],
            limit: 20}
        )
        return res.send(allReports);
    }catch(err){
        next(err)
    }
})

router.get("/section/:sectionId", async function ( req,res, next) {
    const {sectionId} = req.params;
    try{
        var reportsBySection = await Report.findAll({
            where: {
                sectionId: sectionId,
                status: "publicado"
            },
            include: [
                {model: User, attributes: ["id", "name", "lastname", "email"]},
                {model: Section, attributes: ["id", "name"]},
                {model: Tag, attributes:["id", "name"]},
                {model: Stat}
            ],
            order: [["priority", "DESC"]]
        })
        // console.log("esto es reportsBySection", reportsBySection)
        if(reportsBySection) {
            return res.send(reportsBySection)
        }else{
            throw new Error ("no se encontraron reportes para esta sección")
        }
    }catch (err) {
        next(err)
    }
})


router.get("/:id", async function (req, res, next){
    let {id} = req.params;
    try{
        var reportOk = await Report.findByPk(id, {include: [{model: User, attributes: ["id", "email"]},{model: Section, attributes:["id", "name"]}, {model: Tag, attributes:["id", "name"]}, {model: Stat}] })

        console.log("reportOk: ", reportOk)
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
                // console.log("sectionOk es" ,sectionOk)
                if(sectionOk){

                    await sectionOk.addReport(newReport);
                }else{
                    return res.send("no se encontró la sección")
                }

            }catch(err) {return res.send(err)}


            try {
                let tagOk = await Tag.findByPk(tag.id)
                // console.log("tagOk es" ,tagOk)
                if(tagOk){
                    await tagOk.addReport(newReport);
                }else{
                    return res.send("no se encontró la etiqueta")
                }
            }catch(err) {return res.send(err)}

            try {
                let userOk= await User.findByPk(user.id)
                // console.log("userOk es" ,userOk)
                if(userOk){
                    await userOk.addReport(newReport);
                }else{
                    return res.send("no se encontró el usuario")
                }
            }catch(err) {return res.send(err)}

            try{
                let reportStat = await Stat.create({likes: 0, comments: 0, shares: 0});
                console.log("reportStat es " , reportStat)
                if(reportStat) {

                    await reportStat.setReport(newReport);
                }else{
                    console.log("error creando stat")
                    return res.send("no se encontró la estadística")
                }  
    
            }catch(err) {return res.send(err)}
        }
        console.log("reporte creado exitosamente")
        res.status(200).send(newReport);

    }catch (err) {
        next(err);
    }
})

router.put("/update-status/:reportId", async function(req, res, next){
    const {reportId} = req.params;
    const {newStatus} = req.body;
    // console.log("newPriority es: ", newPriority)
    try{
        const reportOk = await Report.findByPk(reportId);
        if(reportOk){
            reportOk.status = newStatus;
            reportOk.save()

            return res.send("reporte actualizado correctamente")
        }else{
            throw new Error("no se encontró el reporte")
        }
    }catch (err){
        next(err)
    }
})

router.put("/update-priority/:reportId", async function(req, res, next){
    const {reportId} = req.params;
    const {newPriority} = req.body;
    console.log("newPriority es: ", newPriority)
    try{
        const reportOk = await Report.findByPk(reportId);
        if(reportOk){
            reportOk.priority = newPriority;
            reportOk.save()

            return res.send(reportOk)
        }else{
            throw new Error("no se encontró el reporte")
        }
    }catch (err){
        next(err)
    }
})

router.put("/:reportId", async function(req, res, next){
    const {reportId} = req.params;
    const { user, section, tag, report } = req.body;
    try{
        const prevReport = await Report.findByPk(reportId, {include:[{model: User},{model: Section}, {model: Tag},{model: Stat}]})
        if(prevReport){
            prevReport.title1= report.title1;
            prevReport.title2= report.title2;
            prevReport.paragraph1 = report.paragraph1;
            prevReport.paragraph2 = report.paragraph2;
            prevReport.paragraph3 = report.paragraph3;
            prevReport.footer1 = report.footer1;
            prevReport.footer2 = report.footer2;
            prevReport.footer3 = report.footer3;
            prevReport.photo1 = report.photo1;
            prevReport.photo2 = report.photo2;
            prevReport.photo3 = report.photo3;
            await prevReport.save();

            if(prevReport.tag.id !== tag.id) {
                try {
                    const newTag = await Tag.findByPk(tag.id)
                    await prevReport.setTag(newTag)
                }catch (err) {
                    throw new Error(err)
                    
                }
            }

            if(prevReport.section.id!== section.id){
                try{
                    const newSection = await Section.findByPk(section.id)
                    await prevReport.setSection(newSection)

                }catch (err) {
                    throw new Error(err)
                    
                }
            }

            const completeReport = await Report.findByPk(reportId, {include:[{model: User},{model: Section}, {model: Tag},{model: Stat}]})

            return res.send(completeReport)

        }else{
            throw new Error("no se encontró el reporte")
            return;
        }
    }catch (err) {next(err)}
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