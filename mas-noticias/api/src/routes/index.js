const { Router } = require('express');

const Report = require("./Report");
const Section = require("./Section");


const router = Router();


router.use("/report", Report)
router.use("/section", Section)


module.exports = router;