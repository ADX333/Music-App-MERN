const express=require("express");
const musicController = require("../controllers/music.controller");
const musicRouter=express.Router();
const upload=multer({
  storage:multer.memoryStorage()
})

router.post('/addMusic',upload.single("music"), musicController.addMusic)

module.exports=musicRouter;