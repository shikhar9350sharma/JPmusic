import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Play, ChevronLeft, ChevronRight, Music2, Sparkles } from 'lucide-react';
import { useSong } from '../context/SongContext';
import { useScrollControls } from "../hooks/useScrollControls";

const Featured = () => {
    const [featureSongs, setFeatureSongs] = useState([]);
    const navigate = useNavigate();
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const { scrollRef, scrollLeft, scrollRight } = useScrollControls();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(55, 63);
                setFeatureSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from Featured:', err));
    }, []);

    const handleFeaturedSongsClick = (gana) => {
        const index = featureSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(featureSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (featureSongs.length > 0) {
            setPlayerSongs(featureSongs);
            setCurrentSong(featureSongs[0]);
            setCurrentIndex(0);
            navigate(`/app/songs/${featureSongs[0].id}`);
        }
    };

    return (
        <div className="py-6 px-4 md:px-0">
            <div className="flex flex-col items-start gap-4">
                {/* Header */}
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
                            Yo Yo Honey Singh
                        </h2>
                    </div>

                    {/* Scroll Controls + Play All */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-1">
                            <button
                                onClick={scrollLeft}
                                className="w-8 h-8 rounded-full bg-[#2b2b2b] hover:bg-[#464646] flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-8 h-8 rounded-full bg-[#2b2b2b] hover:bg-[#464646] flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <button
                            onClick={handlePlayAll}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            Play All
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Songs Carousel */}
                <div ref={scrollRef} className="w-full overflow-x-auto scroll-hidden pb-4">
                    <div className="flex gap-4 md:gap-5">
                        {featureSongs.map((gana) => (
                            <div
                                key={gana.id}
                                className="group w-28 sm:w-32 md:w-36 lg:w-44 flex-shrink-0 cursor-pointer"
                            >
                                {/* Cover Image */}
                                <div
                                    onClick={() => handleFeaturedSongsClick(gana)}
                                    className="relative w-full aspect-square mb-3"
                                >
                                    <img
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                                        src={gana.cover}
                                        alt={gana.title}
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-3">
                                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                        </div>
                                    </div>
                                    {/* Featured Badge */}
                                    <div className="absolute top-2 right-2 bg-purple-500/80 backdrop-blur-sm rounded-full p-1">
                                        <Star className="w-3 h-3 text-white fill-white" />
                                    </div>
                                </div>

                                {/* Song Info */}
                                <div className="min-w-0 px-1">
                                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
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
        </div>
    );
};

export default Featured;