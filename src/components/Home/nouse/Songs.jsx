import React from 'react'
import { useState, useEffect } from 'react'

const Songs = () => {
    const [songs, setSongs] = useState([])
    const [likedsongs, setLikedSongs] = useState({})
    useEffect(() => {

        fetch('http://localhost:3001/songs')
            .then((res) => res.json())
            .then((data) => setSongs((data.slice(0, 18))))
            .catch((err) => console.log('Fetching song cover error: ', err))
    }, [])
    const toggleLike = (id)=>{
        setLikedSongs((prev)=>({...prev, [id]: !prev[id],}));
    }

    return (
        <div className='flex flex-col gap-3'>
            {songs.map((cards) => (
                <div key={cards.id} className='flex items-center justify-between gap-4 border border-transparent hover:bg-[#0c0c0c] transition-all px-3 py-2 rounded-lg'>
                    <div className="flex items-center gap-4 flex-1">
                        <span className="w-4 text-sm text-gray-400">{cards.id}</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10">
                                <img className="w-full h-full object-contain" src={`https://picsum.photos/seed/${cards.id}/200`} alt="img" />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm font-medium">{cards.title}</div>
                                <div className="text-sm text-gray-400">{cards.artist}</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-16 text-sm text-gray-400 text-center">
                        {cards.duration || "–:––"}
                    </div>

                    <div className='w-6 flex justify-center'>
                        <button onClick={()=> toggleLike(cards.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill={likedsongs[cards.id] ? 'white' : "none"}>
                            <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Songs
