import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [role,setRole]=useState("user");
  const [isLogin,setIsLogin]=useState(true);
  
  function handleEmail(e){
    setEmail(e.target.value)
  }
  function handlePass(e){
    setPassword(e.target.value)
  }
  function handleUsername(e){
    setUsername(e.target.value)
  }
  function handleRole(e){
    setRole(e.target.value)
  }

  async function handleLogin(e){
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
  
  async function handleSignup(e){
    e.preventDefault();
    try{
    const signupData=await axios.post('http://localhost:3000/api/auth/register',{
      email:email,
      username:username,
      password:password,
      role:role
    })
    setIsLogin(true)
  }
  catch(err){
    console.log(err);
  }
  }

  return (
    
    <div>
      {isLogin ? (<form onSubmit={handleLogin}>
        <input className="border border-purple-700 p-2" value={email} placeholder='Email' onChange={handleEmail}></input>
        <input className="border border-purple-700 p-2" value={password} placeholder='Password' onChange={handlePass}></input>
        <button className="bg-black text-purple-700 rounded-xl p-3">Submit</button>
        <div>
          <p>Not registered? Sign up first!</p>
          <button className="bg-black text-purple-700 rounded-xl p-3" onClick={signUp}>Sign up</button>
        </div>
      </form>) 
      : 
      (<form onSubmit={handleSignup}>
        <input className="border border-purple-700 p-2" value={email} placeholder='Email' onChange={handleEmail}></input>
        <input className="border border-purple-700 p-2" value={username} placeholder='Enter a Username' onChange={handleUsername}></input>
        <input className="border border-purple-700 p-2" value={password} placeholder='Password' onChange={handlePass}></input>
        <select className="border border-purple-700 p-2" placeholder='Role' onChange={handleRole}>
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
        <button className="bg-black text-purple-700 rounded-xl p-3">Submit</button>
        
      </form>)}
      
    </div> 
    
    
  )
}
