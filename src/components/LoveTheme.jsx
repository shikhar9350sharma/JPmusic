import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play, Music2, ArrowRight } from 'lucide-react';
import { useSong } from '../context/SongContext';

const LoveTheme = () => {
    const [loveThemeSongs, setLoveThemeSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(10, 13);
                setLoveThemeSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from LoveTheme:', err));
    }, []);

    const handleLoveThemeClick = (gana) => {
        const index = loveThemeSongs.findIndex((s) => s.id === gana.id);
        setPlayerSongs(loveThemeSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        setIsPlaying(true);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (loveThemeSongs.length > 0) {
            setPlayerSongs(loveThemeSongs);
            setCurrentSong(loveThemeSongs[0]);
            setCurrentIndex(0);
            setIsPlaying(true);
            navigate(`/app/songs/${loveThemeSongs[0].id}`);
        }
    };

    return (
        <div className="w-full">
            {/* Mood Card */}
            <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 shadow-2xl group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/20 blur-xl" />
                </div>

                <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Heart className="w-7 h-7 text-white fill-white" />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Love Beats
                        </h2>
                        <p className="text-sm text-pink-100 leading-relaxed max-w-xs">
                            Heartfelt rhythms and soulful drops—where every beat tells a love story.
                        </p>
                    </div>

                    {/* Song Covers */}
                    <div className="flex items-center justify-center gap-3">
                        {loveThemeSongs.map((gana, index) => (
                            <div
                                key={gana.id}
                                onClick={() => handleLoveThemeClick(gana)}
                                className={`
                                    relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden cursor-pointer
                                    hover:scale-110 transition-transform duration-300 shadow-lg
                                    ${index === 1 ? 'z-10 scale-110' : 'z-0'}
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
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2.5 px-6 rounded-full transition-all duration-200 font-medium text-sm group/btn"
                    >
                        <Play className="w-4 h-4 fill-white" />
                        Play All
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Songs List (Optional - shows below card on larger screens) */}
            <div className="mt-6 space-y-2">
                {loveThemeSongs.map((gana, index) => (
                    <div
                        key={gana.id}
                        onClick={() => handleLoveThemeClick(gana)}
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
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-pink-400 transition-colors">
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

export default LoveTheme;