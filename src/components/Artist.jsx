import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
const Artist = () => {
    const [Artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/artists')
            .then((res) => res.json())
            .then((data) => setArtists(data));
    }, [])
    const handleArtistClick =(artist)=>{
        navigate(`/app/artists/${artist.id}`)
    }
    return (
        <div>
            <div className='flex flex-col items-start gap-4 py-2 px-4'>
                <div className='flex items-center w-full justify-between'>
                    <div><h1 className='text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline '>Artists</h1></div>
                </div>
                <div className='w-full overflow-x-auto  scroll-smooth scroll-hidden'>
                    <div className='flex gap-4  mx-auto '>
                        {Artists.map((artist) => (
                            <div key={artist.id} onClick={()=> handleArtistClick(artist)} className="w-28 md:w-32 lg:w-44 flex-shrink-0 flex flex-col">
                                <div className="w-full h-28 md:h-32 lg:h-44 p-2 hover:scale-105 transition-transform duration-300">
                                    <img loading='lazy' className="w-full h-full object-cover rounded-full" src={artist.cover} alt={artist.title} />
                                </div>
                                <div className="text-sm lg:text-lg font-semibold flex flex-col">
                                    <h2 className="truncate whitespace-nowrap overflow-hidden text-ellipsis">{artist.title}</h2>
                                    <span className="truncate block whitespace-nowrap overflow-hidden text-ellipsis text-gray-400">
                                        {artist.bio}
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

export default Artist
