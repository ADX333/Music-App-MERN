const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')

async function registerUser(req,res){
  const {username,email,password,role="user"}=req.body;

   const userExists=await userModel.findOne({
    $or:[
    {username:username},
    {email:email}
   ]
  })

  if (userExists){
    return res.status(409).json({message:"User already exists. Login to continue"})
  }

  const hash=await bcrypt.hash(password, 10);

  const user=await userModel.create({
    username,
    email,
    password:hash,
    role
  })
  const token=jwt.sign({
    id:user._id,
    role: user.role
  },
     process.env.JWT_TOKEN)

  res.cookie("token", token);
  res.status(201).json({
    message:"User Registered Succesfully",
    user:{
      id:user._id,
      username:user.username,
      email: user.email,
      role : user.role,
    }
  })
}

async function loginUser(req,res){
  const {username,email,password,role}=req.body;

  const user=await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(!user){
    return res.status(401).json({
      message:"Wrong credentials"
    })
  }
  
  if (user){
    //Login
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(401).json({
      message:"Wrong credentials"
    })
  }
    const token=jwt.sign({
      id:user._id,
      role:user.role
    }, process.env.JWT_TOKEN)

    res.cookie(token,"token");

    res.status(200).json({
      message:"User Logged in successfully"
    })
  }

  }



module.exports={registerUser, loginUser};