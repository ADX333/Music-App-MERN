const mongoose=require('mongoose');

const musicSchema=new mongoose.Schema({
  artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  uri:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  }

})

const musicModel=mongoose.model('song', musicSchema);

module.exports=musicModel; 