const {ImageKit}=require("@imagekit/nodejs");
const { URLEndpoints } = require("@imagekit/nodejs/resources/accounts/url-endpoints.js");

const ImageKitClient= new ImageKit({
  privateKey:process.env.IMAGEKIT_PVT_KEY,
  
})

async function uploadFile(file){
  const result= await ImageKitClient.files.upload({
    file,
    fileName:"music_"+ Date.now(),
    folder:"backend/music"
  })
  return result;
}

module.exports={uploadFile}