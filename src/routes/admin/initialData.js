const express=require("express");
const router=express.Router();
const { intialData } = require("../../controller/admin/initialData");

router.post("/initialdata", intialData);


module.exports = router;