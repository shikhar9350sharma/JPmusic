import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Play, ChevronRight, Music2 } from "lucide-react";
import { useSong } from "../context/SongContext";

const ListenAgain = () => {
    const [listenAgainSongs, setListenAgainSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(12, 24);
                setListenAgainSongs(slicedSongs);
                setPlayerSongs(slicedSongs);
            })
            .catch((err) => console.log('Fetching song cover error: ', err));
    }, []);

    const handleListenAgainClick = (gana) => {
        const index = listenAgainSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(listenAgainSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
    };

    const handlePlayAll = () => {
        if (listenAgainSongs.length > 0) {
            setPlayerSongs(listenAgainSongs);
            setCurrentSong(listenAgainSongs[0]);
            setCurrentIndex(0);
            navigate(`/app/songs/${listenAgainSongs[0].id}`);
        }
    };

    return (
        <div className="w-full py-6 px-4 md:px-0 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <RotateCcw className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
                        Listen Again
                    </h2>
                </div>
                <button 
                    onClick={handlePlayAll}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                    Play All
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            {/* Songs Carousel */}
            <div className="w-full overflow-x-auto scroll-hidden pb-4">
                <div className="flex gap-4 md:gap-5">
                    {listenAgainSongs.map((gana) => (
                        <div
                            key={gana.id}
                            className="group w-28 sm:w-32 md:w-36 lg:w-44 flex-shrink-0 cursor-pointer"
                        >
                            {/* Cover Image */}
                            <div 
                                onClick={() => handleListenAgainClick(gana)}
                                className="relative w-full aspect-square mb-3"
                            >
                                <img
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                                    src={gana.cover}
                                    alt={gana.title}
                                />
                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                            </div>

                            {/* Song Info */}
                            <div className="min-w-0 px-1">
                                <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                                    {gana.title}
                                </h3>
                                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                                    <Music2 className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{gana.artist}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListenAgain;