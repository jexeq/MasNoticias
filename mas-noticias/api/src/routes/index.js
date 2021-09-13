const { Router } = require('express');

const Report = require("./Report");
const Section = require("./Section");
const Tag = require("./Tag");
const User = require("./User");
const Weather = require("./Weather");



const router = Router();

router.use("/tag", Tag);
router.use("/report", Report);
router.use("/section", Section);
router.use("/user", User)
router.use("/weather" , Weather);



module.exports = router;