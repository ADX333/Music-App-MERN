const express=require("express");
const musicController = require("../controllers/music.controller");
const multer=require('multer');
const router=express.Router();
const upload=multer({
  storage:multer.memoryStorage()
})

router.post('/addMusic',upload.single("music"), musicController.addMusic)

router.post('/addAlbum', musicController.addAlbum)

module.exports=router;