const { Section, Stat, Tag, User, Videoreport } = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get('/' , async function (req, res, next) {
    try {
        const videos = await Videoreport.findAll({
            include: [
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email", "name", "lastname"]}
            ]
        })
        if(videos){
            return res.send(videos);
        }else{
            throw new Error('no se encontraron videos');
        }

    }catch(err){
        next(err);
    }
})

router.get('/active', async function (req,res,next){
    try {
        const videos = await Videoreport.findAll({
            where: {status: 'publicado'},
            include: [
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email", "name", "lastname"]}
            ]
        })
        if(videos){
            return res.send(videos);
        }else{
            throw new Error('no se encontraron videos');
        }

    }catch(err){
        next(err);
    }
})

router.post('/' , async function (req, res, next) {
    const { videoReport, userId, sectionId, tagId} = req.body;

    const { title1, title2, video, footer1, paragraph1 } = videoReport;
   
    try{
        const [newVideoReport, videoCreated] = await Videoreport.findOrCreate(
            {
                where: {title1: title1},
                defaults: {
                    title1: title1,
                    title2: title2,
                    video: video,
                    footer1: footer1,
                    paragraph1: paragraph1,
                    date: new Date()
                }
            }
        )
        
        if(!videoCreated){
            res.status(400).send("Ya existe reporte con este título");
        }else{
            try{
                let sectionOk = await Section.findByPk(sectionId);
                if(sectionOk){
                    await sectionOk.addVideoreport(newVideoReport);
                }else{
                    throw new Error ("no se encontró la sección");    
                }
            }catch(err){
                next(err);
            }

            try{
                let tagOk = await Tag.findByPk(tagId);

                if(tagOk) {
                    await tagOk.addVideoreport(newVideoReport);
                }else{
                    throw new Error('No se encontró la etiqueta');
                }
            }catch(err){
                next(err)
            }
            try{
                let videoStat = await Stat.create({likes: 0, comments: 0, shares:0})
                if(videoStat) {
                    await videoStat.setVideoreport(newVideoReport);
                }
            }catch(err){
                next(err);
            }
            try{
                let userOk = User.findByPk(userId);
                if(userOk){
                    userOk.addVideoreport(newVideoReport);
                }else{
                    throw new Error('no se encontró el usuario');
                }
            }catch(err){
                next(err)
            }
        }
    console.log("VideoReporte creado con éxito");    
    return res.send(newVideoReport);    

    }catch(err) {
        next(err);
    }
})

module.exports = router;