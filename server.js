const dns=require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = require('./src/app');
const connectDB = require('./src/db/db');
require("dotenv").config();

connectDB();

app.listen(3000,()=>{
  console.log ("Server running on 3hazaar")
})

