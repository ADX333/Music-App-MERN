import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [songs, setSongs]=useState([]);

  useEffect(()=>{
    const fetchSongs=async()=>{
      try{
      const getSongs=await axios.get('http://localhost:3000/api/music/getMusic', {withCredentials:true})
      console.log(getSongs.data)
      setSongs(getSongs.data.songs)
      }catch(err){
        console.log(err)
      }
  }
  fetchSongs()

},[])
  
  return (
    <div>
      <p>Songs</p>
      {songs.map((song)=>(
        <div key={song._id}>
          <p>{song.title}</p>
          <audio src={song.uri} controls></audio>
        </div>
      ))}
    </div>
  )
}

 