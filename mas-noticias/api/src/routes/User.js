const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");


router.get("/", async function( req, res, next) {
    try {
        var allUsers = await User.findAll({include:[{model: Report, attributes: ["id", "title1"]}]})
        console.log("allUsers: " ,allUsers)
       return  res.send(allUsers)

    }catch(err){
        next(err)   
    }
})

router.get("/:userId", async function(req,res,next) {
    // console.log("buscando usuario por id")
    const {userId} = req.params;
    try {
        var singleUser = await User.findByPk(userId)

        if(singleUser) {
            return res.send(singleUser);
        }else{
            console.log("no existe el usuario con id " , userId)
            return res.send({})
        }
         
    }catch(err) {
        next(err)
    }
})

router.get("/useremail/:email", async function (req, res, next) {
    const {email} = req.params;

    try {

        let userPre = await User.findOne({where:{email: email}})
    
        if(userPre.id) {
            res.send(userPre)
        }else {
            throw new Error(false)
        }

    } catch(err) {
        console.log("no se encontro el email")
        return res.send(false)
    }
})

router.post("/", async function ( req, res, next) {
    const {id, name, lastname, email} = req.body;
    // console.log("req.body" , req.body)
    try {

        const [newUser, createdUser] = await User.findOrCreate(
            {where: {email: email},
            defaults: {
                id: id,
                name: name,
                lastname: lastname,
                email: email
            }}
        )

        if(!createdUser) {
            throw new Error("ya existe un usuario con este email");
        }else {
            return res.send(newUser);
        }

    } catch (err) {
         next(err)}
})

router.put("/",async function (req,res,next) {
    //entra un array
     var arr = req.body
        //reformular para trabajar con promise.all
         arr.forEach(async (c) => {
                let changes=c.changes
                let id=c.id
             try {
                 await User.update(changes,{where:{id:id}}) 
             } catch (error) {
                 next(error)
             }
    
         })
    
         const allUsers= await User.findAll()
        //solo el admi puede modificar su active
        return res.send(allUsers)
    })

router.delete("/:userId", async function ( req, res, next) {
    const {userId} = req.params
    try {
        User.destroy({where:{
            id: userId
        }})
        return res.send("se eliminó el usuario");
    } catch (err) { 
        next(err)}
})

module.exports = router;