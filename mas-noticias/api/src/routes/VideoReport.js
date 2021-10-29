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
            ],
            limit: 50,
            order: [["date", "DESC"],["priority", "DESC"] ]
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
            where: {
                date: {
                    [Op.gt]: new Date(new Date() - (24 * 60 * 60 * 1000 * 7 *2)  )
                },
                status: 'publicado'
            },
            include: [
                {model: Section, attributes: ["name"]},
                {model: Tag, attributes: ["name"]},
                {model: Stat , attributes: ["likes", "comments", "shares"]},
                {model: User, attributes: ["id", "email", "name", "lastname"]}
            ],
            limit: 50,
            order: [["date", "DESC"],["priority", "DESC"] ]
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

router.get('/:videoId', async function (req, res, next) {
    const {videoId} = req.params;
    console.log("videoId " , videoId)
    try {
        const videoOk = await Videoreport.findByPk(videoId, {include: [{model: User, attributes: ["id", "email"]},{model: Section, attributes:["id", "name"]}, {model: Tag, attributes:["id", "name"]}, {model: Stat}]})
        if(videoOk?.id){
            return res.send(videoOk)
        }else{
            throw new Error("No se encontró el video");
        }
    }catch(err){
        next(err)
    }
})

router.post('/' , async function (req, res, next) {
    const { videoReport, userId, sectionId, tagId} = req.body;

    const { title1, title2, video, footer1, paragraph1, date } = videoReport;
    

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
                    date: date
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
                let userOk = await User.findByPk(userId);
                if(userOk){
                    await userOk.addVideoreport(newVideoReport);
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

router.put('/status', async function (req,res,next){
    const { videoId, newStatus } = req.query;

    try{
        const video = await Videoreport.findByPk(videoId);
        if(video){
            video.status = newStatus;
            await video.save();
            return res.send(video);
        }else{
            return res.status(407).end("no se encontró el video")
        }
    }catch(err){
        next(err);
    }
})

router.put('/priority', async function (req,res,next){
    const { videoId, newPriority } = req.query;
    try{
        const video = await Videoreport.findByPk(videoId);
        if(video){
            video.priority = newPriority;
            await video.save();
            return res.send(video);
        }else{
            return res.status(407).end("no se encontró el video")
        }
    }catch(err){
        next(err);
    }
})

router.put('/', async function(req,res,next){
    const { sectionId, tagId, videoReport} = req.body;
    try{
        const sectionOk = await Section.findByPk(sectionId);
        const tagOk = await Tag.findByPk(tagId);
        const videoOk = await Videoreport.findByPk(videoReport.id)
        if(videoOk?.id){
            videoOk.setTag(tagOk);
            videoOk.setSection(sectionOk);
            videoOk.title1 = videoReport.title1;
            videoOk.title2 = videoReport.title2;
            videoOk.paragraph1 = videoReport.paragraph1;
            videoOk.video = videoReport.video;
            videoOk.footer1 = videoReport.footer1;
            await videoOk.save();
            return res.send(videoOk);
        }
    }catch(err){
        next(err);
    }
})

router.delete('/:videoId', async function (req,res,next){
    const {videoId} = req.params;
    try{
        await Videoreport.destroy({where:{id:videoId}});
        res.send("se eliminó el video")
    }catch(err){
        next(err);
    }
})

module.exports = router;