import React from 'react'
import LoveTheme from './LoveTheme'
import Sad from './Sad'
import Party from './Party'
import Adventure from './Adventure'
import Sleepy from './Sleepy'

const ExploreAll = () => {

    return (
        <div className=' flex items-center gap-x-2 p-4 overflow-x-auto scroll-hidden'>
            <LoveTheme />
            <Sad />
            <Party/>
            <Adventure/>
            <Sleepy/>
        </div>
    )
}

export default ExploreAll
