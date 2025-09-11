import React, { useState, useEffect } from 'react';
import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';

const Sad = () => {
    const [SadSongs, setSadSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(7, 10);
                setSadSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Sad component:', err));
    }, []);

    const handleSadClick = (gana) => {
        const index = SadSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(SadSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        // setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
        navigate(`/app/songs/${gana.id}`)
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-60 h-80 flex-shrink-0 rounded-lg flex flex-col items-center justify-evenly gap-5 p-6 bg-[#09283ca6]">
                <div className="text-center">
                    <h1 className="capitalize text-sm sm:text-lg font-bold text-white">
                        Saddy Moddy 🤍
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-100 mt-1">
                        Echoes of heartbreak, wrapped in melodies that never let go.
                    </p>
                </div>

                <div className="w-full flex justify-center flex-wrap gap-4 mt-4">
                    {SadSongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handleSadClick(gana)}
                            className="w-12 h-12  sm:w-12 sm:h-12 text-black hover:scale-105 transition-transform duration-300 cursor-pointer"
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

export default Sad;