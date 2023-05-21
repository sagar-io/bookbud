import React from 'react'
import './style.css'

const Video = () => {
  return (
    <div className='video-container'>
        <iframe 
        width="928"
         height="522"
          src="https://www.youtube.com/embed/KYuqUU-qW0c"
           title="Welcome to eBooks Store!" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>
  )
}

export default Video