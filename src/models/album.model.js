const mongoose=require('mongoose');
const musicModel = require('./music.model');

const albumSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  songs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"song"
  }],
  artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
})

const albumModel=mongoose.model('album', albumSchema) 

module.exports=albumModel;