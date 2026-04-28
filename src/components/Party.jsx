import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Play, Music2, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Party = () => {
    const [partySongs, setPartySongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(55, 58);
                setPartySongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Party:', err));
    }, []);

    const handlePartyClick = (gana) => {
        const index = partySongs.findIndex((s) => s.id === gana.id);
        setPlayerSongs(partySongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setIsPlaying(true);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (partySongs.length > 0) {
            setPlayerSongs(partySongs);
            setCurrentSong(partySongs[0]);
            setCurrentIndex(0);
            setIsPlaying(true);
            navigate(`/app/songs/${partySongs[0].id}`);
        }
    };

    return (
        <div className="w-full">
            {/* Mood Card */}
            <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 shadow-2xl group">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-fuchsia-400/40 blur-3xl animate-pulse" />
                    <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-yellow-400/30 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-cyan-400/20 blur-xl" />
                    {/* Floating sparkles */}
                    {[...Array(5)].map((_, i) => (
                        <Sparkles
                            key={i}
                            className="absolute text-yellow-300/20 animate-pulse"
                            style={{
                                left: `${10 + i * 18}%`,
                                top: `${15 + (i % 3) * 20}%`,
                                animationDelay: `${i * 0.4}s`,
                                width: `${12 + i * 2}px`,
                                height: `${12 + i * 2}px`
                            }}
                        />
                    ))}
                </div>

                <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg animate-bounce">
                        <PartyPopper className="w-7 h-7 text-white" />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Party Plays
                        </h2>
                        <p className="text-sm text-purple-200/80 leading-relaxed max-w-xs">
                            Beats that bounce, vibes that glow—this is your soundtrack to dancing like nobody's watching.
                        </p>
                    </div>

                    {/* Song Covers */}
                    <div className="flex items-center justify-center gap-3">
                        {partySongs.map((gana, index) => (
                            <div
                                key={gana.id}
                                onClick={() => handlePartyClick(gana)}
                                className={`
                                    relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden cursor-pointer
                                    hover:scale-110 transition-transform duration-300 shadow-lg
                                    ${index === 1 ? 'z-10 scale-110 ring-2 ring-yellow-400/50' : 'z-0'}
                                `}
                            >
                                <img
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                    src={gana.cover}
                                    alt={gana.title}
                                />
                                {/* Hover Play */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white fill-white" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Play All Button */}
                    <button
                        onClick={handlePlayAll}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white py-2.5 px-6 rounded-full transition-all duration-200 font-semibold text-sm shadow-lg group/btn"
                    >
                        <Zap className="w-4 h-4" />
                        Play All
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Songs List */}
            <div className="mt-6 space-y-2">
                {partySongs.map((gana, index) => (
                    <div
                        key={gana.id}
                        onClick={() => handlePartyClick(gana)}
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
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
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

export default Party;