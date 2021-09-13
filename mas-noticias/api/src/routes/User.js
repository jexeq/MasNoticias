const {Report, Section, Stat, Tag, User} = require("../db");
const router = require('express').Router();
const { Op } = require("sequelize");


router.get("/", async function( req, res, next) {
    try {
        var allUsers = await User.findAll({include:[{model: Report, attributes: ["id", "title1"]}]})

       return  res.send(allUsers)

    }catch(err){
        next(err)   
    }
})

router.post("/", async function ( req, res, next) {
    const {id, name, lastname, email} = req.body;
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