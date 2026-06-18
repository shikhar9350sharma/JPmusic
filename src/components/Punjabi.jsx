import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Play, Music2, ArrowRight, Flame, Star } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Punjabi = () => {
    const [punjabiSongs, setPunjabiSongs] = useState([]);
    const { playSong } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/punjabi')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(0, 8);
                setPunjabiSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Punjabi:', err));
    }, []);

    const handlePunjabiClick = (gana) => {
        const index = punjabiSongs.findIndex((s) => s.id === gana.id);
        playSong(gana, punjabiSongs, index);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (punjabiSongs.length > 0) {
            playSong(punjabiSongs[0], punjabiSongs, 0);
            navigate(`/app/songs/${punjabiSongs[0].id}`);
        }
    };

    return (
        <div className="w-full">
            <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 shadow-2xl group">
                <div className="absolute inset-0 opacity-25">
                    <div className="absolute top-6 right-6 w-36 h-36 rounded-full bg-yellow-400/40 blur-3xl animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-28 h-28 rounded-full bg-orange-400/30 blur-2xl" />
                    <div className="absolute top-1/3 left-1/2 w-20 h-20 rounded-full bg-red-400/20 blur-xl animate-pulse" style={{ animationDelay: '0.7s' }} />
                    <Flame className="absolute top-8 left-8 w-16 h-16 text-white/5 rotate-12" />
                    <Star className="absolute bottom-12 right-10 w-12 h-12 text-white/5 -rotate-12" />
                </div>

                <div className="relative p-6 md:p-8 flex flex-col items-center text-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Music className="w-7 h-7 text-white" />
                    </div>

                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Punjabi Hits
                        </h2>
                        <p className="text-sm text-orange-200/80 leading-relaxed max-w-xs">
                            High-energy bhangra, desi beats, and Punjabi anthems that make you move.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        {punjabiSongs.map((gana, index) => (
                            <div
                                key={gana.id}
                                onClick={() => handlePunjabiClick(gana)}
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
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white fill-white" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handlePlayAll}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white py-2.5 px-6 rounded-full transition-all duration-200 font-semibold text-sm shadow-lg group/btn"
                    >
                        <Flame className="w-4 h-4" />
                        Play All
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                {punjabiSongs.map((gana, index) => (
                    <div
                        key={gana.id}
                        onClick={() => handlePunjabiClick(gana)}
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
                            <h3 className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
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

export default Punjabi;