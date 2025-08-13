import React from 'react'
import NewRlease from '../components/NewRelease'
import Artist from '../components/Artist'
import English from '../components/English'
import Punjabi from '../components/Punjabi'
import ExploreAll from '../components/ExploreAll'

const Explore = () => {
  return (
    <div>
      <div className=' h-full py-10 flex flex-col mb-10 '>
        <NewRlease/>
        <Artist />
        <ExploreAll />
        <English />
        <Punjabi />
      </div>
        
    </div>
  )
}

export default Explore
