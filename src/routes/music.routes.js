const app = require("../app");
const express=require("express");
const addMusic = require("../controllers/music.controller");
app.use(express.json())
const router=express.Router();

router.post('/addMusic', addMusic)
