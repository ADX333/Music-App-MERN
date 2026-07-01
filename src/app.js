const express=require('express');
const cookieParser=require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const musicRouter = require('./routes/music.routes');
const cors=require('cors')

const app=express();

app.use(cors({
  origin:['http://localhost:5173','https://musicomern.vercel.app'],
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/music', musicRouter)

module.exports=app;