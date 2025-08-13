
import { useState, useEffect } from 'react'
import Albums from './Albums'
import QuickPlay from './QickPlay'
import ListenAgain from './ListenAgain'
import Featured from './Featured'
import Artist from './Artist'

const HomePage = () => {
  return (
    <div className='pt-0 sm:pt-2 md:pt-10 pb-32 md:pb-24'>
      <Albums/>
      <QuickPlay/>
      <ListenAgain />
      <Featured />
      <Artist />
    </div>
  )
}

export default HomePage
