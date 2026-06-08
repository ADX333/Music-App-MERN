const musicModel = require("../models/music.model");
const jwt=require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");


async function addMusic(req,res){
  
  const {title} =req.body;
  if(!req.file){
    return res.status(400).json({
      message:"Music file is required"
    });
  }
  const result=await uploadFile(req.file.buffer.toString('base64'))
  const music=await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id
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
 
async function addAlbum(req,res){
  

  const {title,songs}=req.body;
  const album=await albumModel.create({
   title,
   songs: songs,
   artist: req.user.id
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

async function getAllMusic(req,res){
  const songs=await musicModel.find().populate("artist", "username")

  res.status(200).json({
    message:"All music fetched",
    songs:songs
  })
}

async function getAllAlbums(req,res){ 
  const albums=await albumModel.find().select("title artist").populate("artist","username")

  res.status(200).json({
    message:"Albums fetched successfully",
    albums:albums
  })
}

async function getAlbumById(req,res){
  const albumId=req.params.albumId;
  const album=await albumModel.findById(albumId).populate("artist","username email").populate("songs")

  return res.status(200).json({
    message:"Album fetched",
    album:album
  })
}

module.exports={addMusic, addAlbum, getAllMusic, getAllAlbums, getAlbumById}; 