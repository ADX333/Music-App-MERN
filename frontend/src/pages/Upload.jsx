import React, { useState } from 'react'
import axios from 'axios';

function Upload() {
  const [title,setTitle]=useState("");
  const [music,setMusic]=useState(null);

  async function handleSubmit(e){
    e.preventDefault();
    const formData=new FormData();
    formData.append("title", title);
    formData.append("music", music);
    try{
      const newSong=await axios.post("http://localhost:3000/api/music/addMusic", formData, {withCredentials:true})
      console.log("Uploaded Successfully")
    }
    catch(err){
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
    <div>
      <form onSubmit={handleSubmit}>
        <input value={title} placeholder='Enter the title' onChange={handleTitle}className='border-purple-700 rounded-lg'></input>
        <input type="file" placeholder="Upload the file" onChange={handleFile}
        className='border-purple-700 rounded-lg'></input>
        <button>Upload</button>
      </form>
    </div>
  )
}

export default Upload