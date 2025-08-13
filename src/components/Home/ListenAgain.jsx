import React from 'react'
import { useState, useEffect } from 'react'
const ListenAgain = () => {
    const [songs, setsongs] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/songs')
            .then((res) => res.json())
            .then((data) => setsongs((data.slice(0, 7))))
    }, [])

    return (
        <div>
            <div className='flex flex-col items-start gap-4 py-2'>
                <div className='flex items-center w-full justify-between'>
                    <div><h1 className='text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline '>Listen again</h1></div>
                    <div><button className='rounded-full border border-gray-600 hover:border-white text-sm px-3 py-1.5 sm:text-base sm:px-4 sm:py-2 lg:text-lg lg:px-6 lg:py-2.5'>More</button></div>
                </div>
                <div className='w-full overflow-x-auto max-w-[959px] scroll-smooth scroll-hidden'>
                    <div className='flex gap-4  mx-auto '>
                        {songs.map((gana) => (
                            <div key={gana.id} className="w-28 md:w-32 lg:w-44 flex-shrink-0 flex flex-col">
                                <div className="w-full h-28 md:h-32 lg:h-44 p-2 hover:scale-105 transition-transform duration-300">
                                    <img className="w-full h-full object-contain rounded" src={gana.cover} alt={gana.title} />
                                </div>
                                <div className="text-sm lg:text-lg font-semibold flex flex-col">
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

export default ListenAgain
