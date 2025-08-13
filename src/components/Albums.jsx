import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSong } from '../context/SongContext'; // make sure this path is correct

const Albums = () => {
    const [albumSongs, setAlbumSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(0, 3);
                setAlbumSongs(slicedSongs);
                setPlayerSongs(slicedSongs); 
            })
            .catch((err) => console.error('Fetch error from album component:', err));
    }, []);
    const handleAlbumClick = (gana) => {
        const index = albumSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(albumSongs);       // 👈 Set the current list
        setCurrentSong(gana);
        setCurrentIndex(index);
        setTimeout(() => navigate(`/songs/${gana.id}`), 50);
    };

    return (
        <div>
            <div className="w-full min-h-[20rem] rounded-lg flex flex-col lg:flex-row items-center gap-6 p-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-evenly gap-4">
                    <h1 className="capitalize text-base sm:text-lg md:text-xl text-sky-200">
                        this month's<br />record breaking albums!
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400">
                        Discover the sounds that shattered charts this month—bold, fresh, and impossible to ignore.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <button className="rounded-full border border-gray-600 py-2 px-4 hover:border-white font-medium text-sm">Listen Now</button>
                        <button className="rounded-full border border-gray-600 py-2 px-4 hover:border-white font-medium text-sm">Add To Queue</button>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center flex-wrap gap-4 p-2">
                    {/* Album cards */}
                    {albumSongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handleAlbumClick(gana)}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <img
                                loading="lazy"
                                className="w-full h-full object-cover rounded-md"
                                src={gana.cover}
                                alt={gana.title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Albums;