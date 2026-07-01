import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backGround from '../assets/backg1.png';
import background from '../assets/backg.jpg';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useNavigate} from 'react-router-dom'
import Vinyl from '../assets/Vinyl2.gif'

export default function Home() {
  const [songs, setSongs]=useState([]);
  const [currentSong, setCurrentSong]=useState(null);

  const navigate=useNavigate();

  useEffect(()=>{
    const fetchSongs=async()=>{
      try{
      const getSongs=await axios.get(`${import.meta.env.VITE_API_URL}/api/music/getMusic`, {withCredentials:true})
      console.log(getSongs.data)
      setSongs(getSongs.data.songs)
      }catch(err){
        console.log(err)
      }
  }
  fetchSongs()

},[])

  async function logOut(){
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},{withCredentials:true});
    navigate('/');
  }
  
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backGround})` }}>
    <div className="flex flex-row h-full text-white font-['Roboto_Condensed']">
    <div className="flex flex-col bg-purple-700 h-screen w-1/5 ">
      <p className="text-purple-700 p-3 h-12 bg-black font-extrabold ">Library</p>
      {songs.map((song)=>(
        <div key={song._id}>
          <p className="mt-3 text-xl font-semibold hover:scale-110 transition-all duration-300 pl-4 cursor-pointer" onClick={()=> setCurrentSong(song)}>{song.title}</p>
        </div>
      ))}
    </div>

    <div className="flex gap-3 absolute right-8 top-6">
      
      <button className=" text-red-700 bg-black hover:scale-105 transition-all duration:300 text-xl p-2 rounded-xl" onClick={()=>logOut()}>Log Out</button>

      <button className=" bg-purple-700 text-black hover:scale-105 transition-all duration:300 text-2xl p-2 rounded-xl" onClick={()=>navigate('/upload')}>Upload</button>
    </div>
    
    <div className="flex-1 flex items-center justify-center">
    {currentSong ? (
    <div className="text-center flex flex-col items-center">
        <img className="w-1/2 h-1/3" src={Vinyl}></img>

      <h1 className="text-white text-3xl font-bold">{currentSong.title}</h1>
      <p className="text-purple-400 mt-2 text-lg">Now Playing</p>
    </div>
    ) : (
    <p className="text-white/40 text-xl">Select a song to play</p>
    )}
    </div>
    
    <div className="flex flex-col fixed bottom-0 left-0 w-screen h-[120px] bg-black/5 justify-center items-center backdrop-blur-md rounded-2xl border border-white/10 ">
      <audio controls src={currentSong?.uri} className="mt-3 w-1/2"></audio>
      <h1 className="font-bold mt-2 text-2xl">{currentSong ? currentSong.title : "No song playing"}</h1>
    </div>
    </div>
    </div>
  )
}

 