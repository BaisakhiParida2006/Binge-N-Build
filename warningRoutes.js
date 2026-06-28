const express = require("express");

const router = express.Router();

const protect = require("../middle/authmiddle");

const {

    getWarnings

}=require("../controller/warningC");

router.get("/",protect,getWarnings);

module.exports=router;