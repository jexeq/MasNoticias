const { Router } = require('express');

const Report = require("./Report");
const Section = require("./Section");
const Tag = require("./Tag");
const User = require("./User");
const Weather = require("./Weather");
const Mail = require("./mailing");



const router = Router();

router.use("/tag", Tag);
router.use("/report", Report);
router.use("/section", Section);
router.use("/user", User)
router.use("/weather" , Weather);
router.use("/mail" , Mail);



module.exports = router;