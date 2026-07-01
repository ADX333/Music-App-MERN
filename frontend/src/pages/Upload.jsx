import React, { useState } from 'react'
import axios from 'axios';
import backGround from '../assets/backg1.png';
import musicIcon from '../assets/Icon3.png';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [title,setTitle]=useState("");
  const [music,setMusic]=useState(null);
  const navigate=useNavigate();
  const [message,setMessage]=useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const formData=new FormData();
    formData.append("title", title);
    formData.append("music", music);
    try{
      const newSong=await axios.post("http://localhost:3000/api/music/addMusic", formData, {withCredentials:true})
      setMessage("Song Uploaded Successfully")
      setTimeout(()=>{setMessage('')},5000)
      console.log("Uploaded Successfully")
    }
    catch(err){
      setMessage("Song Upload Failed")
      setTimeout(()=>{setMessage('')},5000)
      console.log("Error Occurred : ", err)
    }
  }

  function handleTitle(e){
    setTitle(e.target.value)
  }

  function handleFile(e){
    setMusic(e.target.files[0])
  }
  
  return (
    <div className=" relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backGround})` }}>
      <div className="absolute top-6 left-6 flex items-center gap-2">
      <img src={musicIcon} alt="Musico logo" className="w-24 h-16" />
      <p className="text-white font-bold">Musico</p>
      </div>
      <div className="absolute right-6 top-6">
        <button className="bg-black text-purple-700 rounded-xl p-3 w-full hover:scale-105 transition-all duration-300" onClick={()=>navigate('/home')}>Home</button>
      </div>
      <div className="flex flex-col h-full justify-center items-center font-['Roboto_Condensed']">
      <div className="w-96 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20">
      <div className="flex h-16 rounded-t-2xl bg-purple-700 justify-end">
        <div className="text-right">
        <h1 className="text-white font-bold ml-4 mt-2 text-xl mr-2">Musico&reg;</h1>
        
        <p className="text-white mr-2 text-xl ">Upload your Music</p>
        </div>
      </div>
      <div className="p-10 gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="border border-purple-700 rounded-sm p-2 w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" value={title} placeholder='Enter the title' onChange={handleTitle}></input>
        <input className="border border-purple-700 rounded-sm p-2 w-full bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-white placeholder-gray-500" type="file" placeholder="Upload the file" onChange={handleFile}
        ></input>
        <button className="bg-purple-700 text-white rounded-xl p-3 w-full hover:scale-105 transition-all duration-300 ">Upload</button>
        {message && <p className="bg-green-600 text-center text-black p-3 text-xl rounded-xl">{message}</p>}

      </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Upload