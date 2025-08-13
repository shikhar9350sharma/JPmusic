import React from 'react'
import { useState, useEffect } from 'react'
const QuickPlay = () => {
    const [songs, setsongs] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/songs')
            .then((res) => res.json())
            .then((data) => setsongs((data.slice(0, 9))))
    }, [])

    return (
        <div>
            <div className='flex flex-col items-start gap-4 py-2'>
                <div className='flex items-center w-full justify-between'>
                    <div><h1 className='text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline '>Quick Picks</h1></div>
                    <div><button className='rounded-full border border-gray-600 hover:border-white text-sm px-3 py-1.5 sm:text-base sm:px-4 sm:py-2 lg:text-lg lg:px-6 lg:py-2.5'>More</button></div>
                </div>
                <div className='w-full overflow-x-auto max-w-full px-2 scroll-smooth scrollbar-hide'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto'>
                        {songs.map((gana) => (
                            <div key={gana.id} className='flex items-center p-2 gap-2 rounded transition-all duration-200 hover:bg-black hover:cursor-pointer w-full max-w-[300px]'>
                                <div className='w-16 h-16 rounded'>
                                    <img className='w-full h-full object-cover rounded' src={gana.cover} alt={gana.title} />
                                </div>
                                <div className="text-sm lg:text-lg font-semibold flex flex-col max-w-[180px] w-full">
                                    <h2 className="truncate whitespace-nowrap overflow-hidden text-ellipsis">{gana.title}</h2>
                                    <span className="truncate block whitespace-nowrap overflow-hidden text-ellipsis text-gray-400">
                                        {gana.artist}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickPlay
