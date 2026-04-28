import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, Play, Music2, ArrowRight, Droplets } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Sad = () => {
    const [sadSongs, setSadSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(7, 10);
                setSadSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Sad:', err));
    }, []);

    const handleSadClick = (gana) => {
        const index = sadSongs.findIndex((s) => s.id === gana.id);
        setPlayerSongs(sadSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setIsPlaying(true);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (sadSongs.length > 0) {
            setPlayerSongs(sadSongs);
            setCurrentSong(sadSongs[0]);
            setCurrentIndex(0);
            setIsPlaying(true);
            navigate(`/app/songs/${sadSongs[0].id}`);
        }
    };

    return (
        <div className="w-full">
            {/* Mood Card */}
            <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-950 shadow-2xl group">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-6 right-6 w-28 h-28 rounded-full bg-blue-400/30 blur-3xl animate-pulse" />
                    <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-indigo-400/20 blur-2xl" />
                    {/* Rain drops effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <Droplets
                                key={i}
                                className="absolute text-blue-300/10 animate-bounce"
                                style={{
                                    left: `${15 + i * 15}%`,
                                    top: `${10 + (i % 3) * 25}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    width: '16px',
                                    height: '16px'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <CloudRain className="w-7 h-7 text-blue-200" />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Saddy Moddy
                        </h2>
                        <p className="text-sm text-blue-200/80 leading-relaxed max-w-xs">
                            Echoes of heartbreak, wrapped in melodies that never let go.
                        </p>
                    </div>

                    {/* Song Covers */}
                    <div className="flex items-center justify-center gap-3">
                        {sadSongs.map((gana, index) => (
                            <div
                                key={gana.id}
                                onClick={() => handleSadClick(gana)}
                                className={`
                                    relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden cursor-pointer
                                    hover:scale-110 transition-transform duration-300 shadow-lg
                                    ${index === 1 ? 'z-10 scale-110 ring-2 ring-blue-400/50' : 'z-0'}
                                `}
                            >
                                <img
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                    src={gana.cover}
                                    alt={gana.title}
                                />
                                {/* Hover Play */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white fill-white" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Play All Button */}
                    <button
                        onClick={handlePlayAll}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-2.5 px-6 rounded-full transition-all duration-200 font-medium text-sm group/btn"
                    >
                        <Play className="w-4 h-4 fill-white" />
                        Play All
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Songs List */}
            <div className="mt-6 space-y-2">
                {sadSongs.map((gana, index) => (
                    <div
                        key={gana.id}
                        onClick={() => handleSadClick(gana)}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2b2b] transition-colors cursor-pointer"
                    >
                        <div className="w-8 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm text-gray-500 group-hover:hidden">
                                {index + 1}
                            </span>
                            <Play className="w-4 h-4 text-white hidden group-hover:block fill-white" />
                        </div>
                        <img
                            src={gana.cover}
                            alt={gana.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                                {gana.title}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Music2 className="w-3 h-3" />
                                <span className="truncate">{gana.artist}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sad;