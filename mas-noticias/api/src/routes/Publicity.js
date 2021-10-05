const { Publicity, User } = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/all-publicity", async function (req, res, next) {

    try {
        const allPublicity = await Publicity.findAll(
            {
                include: [{model: User, attributes: ["email"]}],
                order: [ "createdAt"]
            });
        
        if(allPublicity) {
            console.log("hay publicidades")
            return res.send(allPublicity)
        }else{
            throw new Error("no se encontraron publicidades")
            
        }    

    }catch (err) {
        next(err)
    }
})

router.get("/active" , async function (req, res, next) {

    try {
        const activePublicities = await Publicity.findAll({where: {state: "active"}})
        console.log("activePublicities" , activePublicities)
        if(activePublicities) {
           var sortedPublicity = activePublicities.sort( (a, b) => b.priority - a.priority )
            console.log("sortedPublicity: " , sortedPublicity)
            return res.send(sortedPublicity)
        }else{
            throw new Error("no se encontraron las publicidades")
        }

    }catch(err) {
        next(err)
    }
})

router.get("/:publicityId", async function (req, res, next) {
    const {publicityId} = req.params;
    try {

        const publictyOk = await Publicity.findByPk(publicityId)

        if(publictyOk) {
            console.log("Publicity Route: esto es publicityOk" , publictyOk)
            return res.send(publictyOk)
        }else{
            throw new Error ("no se encontró la publicidad")
        }

    }catch (err) {
        next(err)
    }
})

router.put("/state", async function (req, res, next) {
    const { id, state } = req.body;

    try {
        var publicityPrev = await Publicity.findByPk(id);

        publicityPrev.state = state;
        await publicityPrev.save();

        const afterChangePub = await Publicity.findByPk(id);

        if(afterChangePub.state === state) {
            return res.send(afterChangePub)
        }else{
            throw new Error ("error al cambiar el estado")
        }

    }catch (err) {
        next(err);
    }
})

router.put("/priority", async function (req, res, next) {
    const { id, priority } = req.body;

    try {
        var publicityPrev = await Publicity.findByPk(id);

        publicityPrev.priority = priority;
        await publicityPrev.save();

        const afterChangePub = await Publicity.findByPk(id);
      
        if(afterChangePub.priority === parseInt(priority)) {
            console.log("route publicity/priority - cumplio con el if "  )
            return res.send(afterChangePub)
        }else{
            throw new Error ("error al cambiar la prioridad")
        }

    }catch (err) {
        next(err);
    }
})

router.post("/", async function (req, res, next){
    var { publicity, user } = req.body;

    
    try {

        if(!publicity.init) {
            publicity.init = new Date().toString()
            // console.log("se creo init" , publicity.init)
        }
    
        if(!publicity.end) {
            publicity.end = new Date( new Date() + (1000 * 60 * 60 * 24 * 7)).toString()
            // console.log("se creo init" , publicity.end)
        }
        
        const newPublicity = await Publicity.create(
            {
                owner: publicity.owner,
                init: publicity.init,
                end: publicity.end,
                priority: publicity.priority,
                url: publicity.url,
                type: publicity.type,
                state: publicity.state
            }
        )

        if(newPublicity){
            const userOk = await User.findByPk(user.id)
            if(userOk){
                try {
                    await userOk.addPublicity(newPublicity)

                    console.log("se creó la publicidad y se vinculó al usuario")

                    return res.send(newPublicity)
                }catch (err) {
                    throw new Error("error al vincular usuario/publicidad" , err)
                }

            }else{
                throw new Error("no se encontro al usuario")
            }
        }else {
            throw new Error ("error al crear la publicidad")
        }

    }catch (err) {
        next(err);
    }
})

router.delete("/:publicityId", async function(req, res, next) {
    const {publicityId} = req.params;
    try {
        await Publicity.destroy({where: {id: publicityId}});
        console.log("se eliminó la publicidad")
        return res.send("se eliminó la publicidad")
    }catch(err) {
        next(err)
    }
})

module.exports = router;