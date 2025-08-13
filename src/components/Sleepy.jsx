import React, { useState, useEffect } from 'react';
import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';

const Sleepy = () => {
    const [SleepySongs, setSleepySongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(21, 24);
                setSleepySongs(slicedSongs);
                setPlayerSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Sleepy component:', err));
    }, []);

    const handleSleepyClick = (gana) => {
        const index = SleepySongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(SleepySongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setTimeout(() => navigate(`/songs/${gana.id}`), 50);
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-60 h-80 flex-shrink-0 rounded-lg flex flex-col items-center justify-evenly gap-5 p-6 bg-[#30042d]">
                <div className="text-center">
                    <h1 className="capitalize text-sm sm:text-lg font-bold text-white">
                        Sleepy Sleepy
                    </h1>
                    <p className="text-xs sm:text-sm text-red-200 mt-1">
                        Gentle beats for quiet nights—drift into dreams with every mellow note.
                    </p>
                </div>

                <div className="w-full flex justify-center flex-wrap gap-4 mt-4">
                    {SleepySongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handleSleepyClick(gana)}
                            className="w-12 h-12  text-black hover:scale-105 transition-transform duration-300 cursor-pointer"
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

export default Sleepy;