import React from 'react'
import NewRlease from '../components/NewRelease'
import Artist from '../components/Artist'
import English from '../components/English'
import Punjabi from '../components/Punjabi'
import ExploreAll from '../components/ExploreAll'

const Explore = () => {
  return (
    <div>
      <div className=' h-full  flex flex-col mb-28 '>
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
