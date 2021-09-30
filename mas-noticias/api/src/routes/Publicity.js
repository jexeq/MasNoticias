const { Publicity, User } = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");

router.get("/all-publicity", async function (req, res, next) {

    try {
        const allPublicity = await Publicity.findAll(
            {
                include: [{model: User}],
                order: [ "createdAt", "DESC"]
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

router.post("/", async function (req, res, next){
    var { publicity, user } = req.body;

    if(!publicity.init) {
        publicity.init = new Date()
    }

    if(!publicity.end) {
        publicity.end = new Date( new Date() + (1000 * 60 * 60 * 24 * 7))
    }

    try {
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

module.exports = router;