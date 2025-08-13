import React from 'react'
import { useState, useEffect } from 'react'
import Songs from './Songs'
import Lyrics from './Lyrics'
// import Related from './Related'


const Link = () => {
    const [activeTab, setActiveTab] = useState('Up Next')
  return (
    <div>
      <div className='w-full h-[500px] bg-[#1b1b1b] rounded-lg px-4  scroll-hidden  relative '>
        {/* tabs */}
        <div className='h-16 flex justify-around border-b border-gray-800 mb-4 sticky top-0 bg-[#1b1b1b] backdrop-blur'>
            {['up next','lyrics🎶' ,'related'].map(tab =>(
                <button 
                  key={tab}
                  onClick={()=>setActiveTab(tab)}
                  className={`capitalize py-2 px-4 ${activeTab === tab ? 'border-b-2 border-white font-semibold' : 'text-gray-400'}`}
                >
                 {tab}
                 </button>
            ))}
        </div>
        {/* Content Area */}
        <div className='mt-2 '>
            {activeTab === 'lyrics🎶' && (
                // <p className='text-sm leading-relaxed'> 🎶 These are the lyrics displayed here. Add your poetic magic or pull it dynamically.</p>
                <Lyrics/>
            )}
            {activeTab === 'related' && (
                <ul className='space-y-1 text-sm'>
                    <li>🔗 Related Song 1</li>
                    <li>🔗 Related Song 2</li>
                    <li>🔗 Related Artist</li>
                </ul>
                // <Related/>
            )}
            {activeTab === 'up next' && (
                // <ul className="space-y-1 text-sm">
                //     <li>⏭️ Song 1 coming up</li>
                //     <li>⏭️ Song 2 queued</li>
                //     <li>⏭️ Song 3 after that</li>
                // </ul>
                <Songs/>
            )}
        </div>
      </div>
    </div>
  )
}

export default Link
