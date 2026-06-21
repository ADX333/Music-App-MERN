import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [role,setRole]=useState("user");
  const [isLogin,setIsLogin]=useState("true");
  
  function handleEmail(e){
    setEmail(e.target.value)
  }
  function handlePass(e){
    setPassword(e.target.value)
  }
  async function handleSubmit(e){
    e.preventDefault();
    try{
    const loginData=await axios.post("http://localhost:3000/api/auth/login",{
      email:email,
      password:password
    }, {withCredentials:true})
    console.log(loginData.data)
    navigate('/home')
  }
  catch(err){
    console.log(err)
  }
}
  function signUp(){
    setIsLogin(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="border border-purple-700 p-2" value={email} placeholder='Email' onChange={handleEmail}></input>
        <input className="border border-purple-700 p-2" value={password} placeholder='Password' onChange={handlePass}></input>
        <button className="bg-black text-purple-700 rounded-xl p-3">Submit</button>
      </form>
    </div>
  )
}
