import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Play, Music2, ArrowRight, Stars, Cloud, ZapOff } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Sleepy = () => {
    const [sleepySongs, setSleepySongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(21, 24);
                setSleepySongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Sleepy:', err));
    }, []);

    const handleSleepyClick = (gana) => {
        const index = sleepySongs.findIndex((s) => s.id === gana.id);
        setPlayerSongs(sleepySongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setIsPlaying(true);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (sleepySongs.length > 0) {
            setPlayerSongs(sleepySongs);
            setCurrentSong(sleepySongs[0]);
            setCurrentIndex(0);
            setIsPlaying(true);
            navigate(`/app/songs/${sleepySongs[0].id}`);
        }
    };

    return (
        <div className="w-full">
            {/* Mood Card */}
            <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 shadow-2xl group">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-indigo-400/30 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-purple-400/20 blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-slate-400/15 blur-xl" />
                    {/* Floating stars */}
                    {[...Array(6)].map((_, i) => (
                        <Stars
                            key={i}
                            className="absolute text-indigo-200/15 animate-pulse"
                            style={{
                                left: `${8 + i * 14}%`,
                                top: `${10 + (i % 4) * 18}%`,
                                animationDelay: `${i * 0.6}s`,
                                animationDuration: '3s',
                                width: `${10 + i * 2}px`,
                                height: `${10 + i * 2}px`
                            }}
                        />
                    ))}
                    <Cloud className="absolute bottom-8 right-12 w-14 h-14 text-white/5" />
                    <ZapOff className="absolute top-12 left-10 w-10 h-10 text-white/5 rotate-45" />
                </div>

                <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <Moon className="w-7 h-7 text-white" />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Sleepy Sleepy
                        </h2>
                        <p className="text-sm text-indigo-200/70 leading-relaxed max-w-xs">
                            Gentle beats for quiet nights—drift into dreams with every mellow note.
                        </p>
                    </div>

                    {/* Song Covers */}
                    <div className="flex items-center justify-center gap-3">
                        {sleepySongs.map((gana, index) => (
                            <div
                                key={gana.id}
                                onClick={() => handleSleepyClick(gana)}
                                className={`
                                    relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden cursor-pointer
                                    hover:scale-110 transition-transform duration-300 shadow-lg
                                    ${index === 1 ? 'z-10 scale-110 ring-2 ring-indigo-400/50' : 'z-0'}
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
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-indigo-400/30 text-white py-2.5 px-6 rounded-full transition-all duration-200 font-medium text-sm group/btn"
                    >
                        <Moon className="w-4 h-4" />
                        Sleep Mode
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Songs List */}
            <div className="mt-6 space-y-2">
                {sleepySongs.map((gana, index) => (
                    <div
                        key={gana.id}
                        onClick={() => handleSleepyClick(gana)}
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
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
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

export default Sleepy;