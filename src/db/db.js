const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected")  
  }
  catch(error){
    console.error("Database Connection Failed!", error);
  }
}
module.exports=connectDB;