import React, { useState, useEffect } from 'react';
import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';

const LoveTheme = () => {
    const [LoveThemeSongs, setLoveThemeSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(10, 13);
                setLoveThemeSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from LoveTheme component:', err));
    }, []);

    const handleLoveThemeClick = (gana) => {
        const index = LoveThemeSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(LoveThemeSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        // setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
        navigate(`/app/songs/${gana.id}`)
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-60 h-80 flex-shrink-0 rounded-lg flex flex-col items-center justify-evenly gap-5 p-6 bg-gradient-to-br from-red-500 via-pink-600 to-purple-700">
                <div className="text-center">
                    <h1 className="capitalize text-sm sm:text-lg font-bold text-white">
                        Love Beats
                    </h1>
                    <p className="text-xs sm:text-sm text-red-200 mt-1">
                        Heartfelt rhythms and soulful drops—where every beat tells a love story.
                    </p>
                </div>

                <div className="w-full flex justify-center flex-wrap gap-4 mt-4">
                    {LoveThemeSongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handleLoveThemeClick(gana)}
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

export default LoveTheme;