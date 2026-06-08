const express=require("express");
const musicController = require("../controllers/music.controller");
const multer=require('multer');
const authMiddleware = require("../middlewares/auth.middleware");
const router=express.Router();
const upload=multer({
  storage:multer.memoryStorage()
})

router.post('/addMusic',authMiddleware.authArtist ,upload.single("music"), musicController.addMusic)

router.post('/addAlbum',authMiddleware.authArtist,musicController.addAlbum)

router.get("/",authMiddleware.authUser ,musicController.getAllMusic)

module.exports=router;