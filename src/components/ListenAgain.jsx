import { useState, useEffect } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

const ListenAgain = () => {

    const [listenAgainSongs, setListenAgainSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(12, 24);
                setListenAgainSongs(slicedSongs);     // Local state for rendering
                setPlayerSongs(slicedSongs);                // 🔥 Update context for navigation
            })
            .catch((err) => console.log('Fetching song cover error: ', err));
    }, []);

    // handle click on songs in the list of listen again 
    const handleListenAgainClick = (gana) => {
        const index = listenAgainSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(listenAgainSongs);
        setCurrentSong(gana);
        setCurrentIndex(index); // 🔥 This enables next/previous navigation
        setTimeout(() => navigate(`/songs/${gana.id}`), 50);
    };


    return (
        <div className="w-full py-2 px-4  relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline">
                    Listen again
                </h1>
            </div>
            <div className="w-full  scroll-hidden">
                <div className="flex gap-4 px-2 sm:px-4">
                    {listenAgainSongs.map((gana) => (
                        <div key={gana.id} className="w-24 sm:w-28 md:w-32 lg:w-40 flex-shrink-0 flex flex-col hover:cursor-pointer">
                            <div onClick={() => handleListenAgainClick(gana)} className="w-full h-28 md:h-32 lg:h-44 p-2 hover:scale-105 transition-transform duration-300">
                                <img
                                    loading="lazy"
                                    className="w-full h-full object-contain rounded"
                                    src={gana.cover}
                                    alt={gana.title}
                                />
                            </div>
                            <div className="text-sm lg:text-lg font-semibold flex flex-col min-w-0">
                                <h2 className="truncate">{gana.title}</h2>
                                <span className="truncate text-gray-400">{gana.artist}</span>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListenAgain;