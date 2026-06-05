const musicModel = require("../models/music.model");
const jwt=require("jsonwebtoken");
const imagekit=require

async function addMusic(req,res){
  const token=req.cookies.token;
  if(!token) return res.status(403).json({
      message:"Invalid Request! User not allowed to add music"
    })
  try{
    const decoded=jwt.verify(token,process.env.JWT_TOKEN);
  }
  catch(err){
    return res.status(401).json({
      message:"Invalid Request! User not allowed to add music"
  })
  const role=decoded.role;
   
  if(role!='artist'){
    return res.status(403).json({
      message:"Invalid Request! User not allowed to add music"
    })
  const song=await musicModel.create()
  }
  }}


module.exports=addMusic;