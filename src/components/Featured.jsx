import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useSong } from '../context/SongContext'
import { useNavigate } from 'react-router-dom'
import { useScrollControls } from "../hooks/useScrollControls";


const ListenAgain = () => {
    const [featureSongs, setFeatureSongs] = useState([]);
    const navigate = useNavigate();
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const { scrollRef, scrollLeft, scrollRight } = useScrollControls();

    // useEffect(() => {
    //     fetch('http://localhost:3001/songs')
    //         .then((res) => res.json())
    //         .then((data) => setFeatureSongs((data.slice(10, 20))))
    //         .catch((err)=> console.log('Error found in the Fetured Playlist', err));
    // }, [])
    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(55, 63);
                setFeatureSongs(slicedSongs);
                setPlayerSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from album component:', err));
    }, []);
    const handleFeaturedSongsClick = (gana) => {
        const index = featureSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(featureSongs);       // 👈 Set the current list
        setCurrentSong(gana);
        setCurrentIndex(index);
        // setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
        navigate(`/app/songs/${gana.id}`)
    };
    return (
        <div>
            <div className='flex flex-col items-start gap-4 py-2 px-4'>
                <div className='flex items-center w-full justify-between'>
                    {/* <div><h1 className='text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline '>Featured playlists for you</h1></div> */}
                    <div><h1 className='text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline '>Yo Yo Honey Singh</h1></div>
                   
                </div>
                <div  ref={scrollRef} className='w-full overflow-x-auto  scroll-hidden'>
                    <div className='flex gap-4  mx-auto '>
                        {featureSongs.map((gana) => (
                            <div key={gana.id} className="w-28 md:w-32 lg:w-44 flex-shrink-0 flex flex-col">
                                <div onClick={()=>handleFeaturedSongsClick(gana)} className="w-full h-28 md:h-32 lg:h-44 p-2 hover:scale-105 transition-transform duration-300">
                                    <img loading='lazy' className="w-full h-full object-contain rounded" src={gana.cover} alt={gana.title} />
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
