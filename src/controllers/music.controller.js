const musicModel = require("../models/music.model");
const jwt=require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");
albumModel

async function addMusic(req,res){
  const token=req.cookies.token;
  if(!token) return res.status(403).json({
      message:"Invalid Request! Token not found"
    })
  try{
    const decoded=jwt.verify(token,process.env.JWT_TOKEN);
    const role=decoded.role;
    if(role!='artist'){
    return res.status(403).json({
      message:"Invalid Request! User not allowed to add music"
    })}
  const {title} =req.body;
  const result=await uploadFile(req.file.buffer.toString('base64'))
  const music=await musicModel.create({
    uri:result.url,
    title,
    artist:decoded.id
  })
  res.status(201).json({
    message:"Song added to Library",
    music:{
      id:music._id,
      url:music.uri,
      title:music.title,
      artist:music.artist,
    }
  })
  }
  catch(err){
    console.log(err);
    return res.status(401).json({
      message:"Invalid Request! User not allowed to add music. Error 3"
  })
  }
  }

async function addAlbum(req,res){
  const token=req.cookies.token;
  if  (!token){
    return res.status(401).json({
      message:"No valid login found"
    })
  }
  try{
  const decoded=jwt.verify(token, process.env.JWT_TOKEN);
  const role=decoded.role;
  if(role!='artist'){
    return res.status(403).json({
      message:"Forbidden. Not allowed to upload an album. Sign in as an artist"
    })
  }

  const {title,songIDs}=req.body;
  const album=await albumModel.create({
   title,
   songs: songIDs,
   artist: decoded.id
  })
  res.status(201).json({
    message:"Album created.",
    album: {
      title:album.title,
      id:album._id,
      artist:album.artist,
      songs:album.songs
    }
  })
}
  catch(err){

  }  
}

module.exports={addMusic};