const jwt=require("jsonwebtoken");

async function authArtist(req,res,next){
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"No valid login found! Login again"
    })
  }
  try {
    const decoded=jwt.verify(token, process.env.JWT_TOKEN);
    req.user=decoded;
    const role=decoded.role;
    if (role!= "artist"){
      return res.status(403).json({
      message:"NOT ALLOWED! Sign in as an artist to upload your own music"
      })
  }
    next()
  
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message:"Error Occured! Re-try or check console for more details"
    })
  }
}

async function authUser(req,res,next){
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }
  try {
    const decoded=jwt.verify(token,process.env.JWT_TOKEN);
    if(decoded.role !="user" && decoded.role!='artist'){
      return res.status(403).json({message:"You don't have access to this data"})
    }
    req.user=decoded;
    next()
  } catch (err) {
    console.log(err);
    res.status(403).json({
    message:"Error Occured! Re-try or check console for more details"
    })
  }
}

module.exports={authArtist,authUser};