import React, { useState, useEffect } from 'react';
import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';

const Party = () => {
    const [PartySongs, setPartySongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(55, 58);
                setPartySongs(slicedSongs);
               
            })
            .catch((err) => console.error('Fetch error from Party component:', err));
    }, []);

    const handlePartyClick = (gana) => {
        const index = PartySongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(PartySongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        // setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
        navigate(`/app/songs/${gana.id}`)
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-60 h-80 flex-shrink-0 rounded-lg flex flex-col items-center justify-evenly gap-5 p-6 bg-[#1f1f74]">
                <div className="text-center">
                    <h1 className="capitalize text-sm sm:text-lg font-bold text-white">
                        Party Plays
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1">
                        Beats that bounce, vibes that glow—this is your soundtrack to dancing like nobody’s watching.
                    </p>
                </div>

                <div className="w-full flex justify-center flex-wrap gap-4 mt-4">
                    {PartySongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handlePartyClick(gana)}
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

export default Party;