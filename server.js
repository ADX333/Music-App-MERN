const dns=require('dns');
dns.setServers(['8.8.4.4, 8.8.8.8']);
const app = require('./src/app');
require("dotenv").congif();


app.listen(3000,()=>{
  "Server running on 3hazaar"
})
