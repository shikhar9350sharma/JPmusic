import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, ChevronRight, Music } from 'lucide-react';
import { useSong } from '../context/SongContext';

const QuickPlay = () => {
    const [quickPlaySongs, setQuickPlaySongs] = useState([]);
    const { setCurrentSong, setCurrentIndex, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(0, 12);
                setQuickPlaySongs(slicedSongs);
                setPlayerSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from QuickPlay:', err));
    }, []);

    const handleQuickSongsClick = (gana) => {
        const index = quickPlaySongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(quickPlaySongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
    };

    const handlePlayAll = () => {
        if (quickPlaySongs.length > 0) {
            setPlayerSongs(quickPlaySongs);
            setCurrentSong(quickPlaySongs[0]);
            setCurrentIndex(0);
            navigate(`/app/songs/${quickPlaySongs[0].id}`);
        }
    };

    return (
        <div className="flex flex-col gap-4 py-6 px-4 md:px-0">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
                        Quick Picks
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

            {/* Songs Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
            <div className="w-full overflow-x-auto scroll-hidden pb-2">
                <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 min-w-max md:min-w-0">
                    {quickPlaySongs.map((gana) => (
                        <div
                            key={gana.id}
                            onClick={() => handleQuickSongsClick(gana)}
                            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#2b2b2b] transition-all duration-200 cursor-pointer min-w-[280px] md:min-w-0"
                        >
                            {/* Cover Image with Play Overlay */}
                            <div className="relative flex-shrink-0">
                                <img
                                    loading="lazy"
                                    src={gana.cover}
                                    alt={gana.title}
                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white fill-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Song Info */}
                            <div className="flex flex-col min-w-0 flex-1">
                                <h3 className="text-white font-semibold text-sm truncate group-hover:text-emerald-400 transition-colors">
                                    {gana.title}
                                </h3>
                                <span className="text-gray-400 text-xs truncate flex items-center gap-1">
                                    <Music className="w-3 h-3" />
                                    {gana.artist}
                                </span>
                            </div>

                            {/* Hover Action */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickPlay;