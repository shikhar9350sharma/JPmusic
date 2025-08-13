import React, { useState, useEffect } from 'react'
import Searchbox from './Searchbox'
import ListenAgain from './ListenAgain'
import Albums from './Albums'
import QuickPlay from './QickPlay'
import Featured from './Featured'
import Artist from './Artist'

const Home = () => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    fetch('http://localhost:3001/songs')
      .then((res) => res.json())
      .then((data) => setSongs((data)))
      .catch((err) => console.log('Fetching song cover error: ', err))
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#1b1b1b] px-4 sm:px-6 md:px-16 lg:px-24 py-4">
      <div>
        <Searchbox />
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pt-2">
        <Albums />
        <ListenAgain songs={songs} />
        <QuickPlay />
        <Featured />
        <Artist />
      </div>
    </div>
  )
}

export default Home
