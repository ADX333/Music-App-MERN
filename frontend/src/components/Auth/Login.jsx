import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import musicIcon from '../../assets/Icon3.png'


export default function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [role,setRole]=useState("user");
  const [isLogin,setIsLogin]=useState(true);
  const [message,setMessage]=useState('');
  
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
    }, {withCredentials:true});
    console.log(loginData.data)
    navigate('/home')
  }
  catch(err){
    console.log(err)
    setMessage('Login Failed');
    setTimeout(()=>setMessage(''),5000);
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
    
    <div className="h-screen bg-gray-900 font-['Roboto_Condensed'] flex flex-col justify-center items-center ">
      <div className="bg-gray-950 rounded-xl hover:scale-[1.01] transition-all duration-300 shadow-[0_0_100px_rgba(126,34,206,0.4)] flex flex-row w-[600px] ">
      <div className="w-1/3 bg-purple-700 flex flex-col items-center justify-center rounded-l-xl">
        <img src={musicIcon} alt="Musico logo" className="w- h-44 "></img>
      </div>
      <div className="w-2/3 p-10">
      {isLogin ? (<form className='flex flex-col items-center gap-4' onSubmit={handleLogin}>
        <h1 className="text-white font font-extrabold text-3xl">Musico</h1>
        <h1 className="text-white font-bold">Log-in to Continue</h1>
        <input className="border border-purple-700 p-2 rounded-sm w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" value={email} placeholder='Email' onChange={handleEmail}></input>
        <input className="border border-purple-700 rounded-sm p-2 w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" type="password" value={password} placeholder='Password' onChange={handlePass}></input>
        <button className="bg-purple-700 text-white rounded-xl p-3 w-full hover:scale-105 transition-all duration-300 ">Submit</button>
        <div >
          <p className=" text-white mt-5">Not registered? Sign up first!</p>
          <button className="bg-black mt-2 text-purple-700 text-xl rounded-xl p-3 w-full hover:scale-125 transition-all duration-300" onClick={signUp}>Sign up</button>
        </div>
      </form>)
      
      : 
      
      (<form className='flex flex-col items-center gap-4' onSubmit={handleSignup}>
        <h1 className="font-extrabold text-white text-3xl">Musico </h1>
        <input className="border border-purple-700 p-2 rounded-sm w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" value={email} placeholder='Email' onChange={handleEmail}></input>
        <input className="border border-purple-700 p-2 rounded-sm w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" value={username} placeholder='Enter a Username' onChange={handleUsername}></input>
        <input className="border border-purple-700 p-2 rounded-sm w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" type="password" value={password} placeholder='Password' onChange={handlePass}></input>
        <select className="border border-purple-700 p-2 rounded-sm w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" placeholder='Role' onChange={handleRole}>
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
        <button className="text-black w-full hover:scale-105 transition-all duration-300 bg-purple-700 rounded-xl p-3">Submit</button>
        
      </form>)}
      </div>
      </div>
      <div className="justify-center text-center gap-5 ">
        {message && <p className="bg-red-700 w-96 mt-4 p-4 text-black rounded-xl">{message}</p>}
      </div>
    </div> 
    
    
  )
}
