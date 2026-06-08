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

router.get("/getMusic",authMiddleware.authUser ,musicController.getAllMusic)

router.get("/getAlbums",authMiddleware.authUser, musicController.getAllAlbums)

module.exports=router;