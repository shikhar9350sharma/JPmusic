import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Disc3, TrendingUp } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Albums = () => {
    const [albumSongs, setAlbumSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(90, 93);
                setAlbumSongs(slicedSongs);
            })
            .catch((err) => console.error('Fetch error from album component:', err));
    }, []);

    const handleAlbumClick = (gana) => {
        const index = albumSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(albumSongs);
        setCurrentSong(gana);
        setCurrentIndex(index);
        navigate(`/app/songs/${gana.id}`);
    };

    const handlePlayAll = () => {
        if (albumSongs.length > 0) {
            setPlayerSongs(albumSongs);
            setCurrentSong(albumSongs[0]);
            setCurrentIndex(0);
            navigate(`/app/songs/${albumSongs[0].id}`);
        }
    };

    return (
        <div className="px-4 md:px-0">
            <div className="w-full min-h-[20rem] rounded-2xl flex flex-col lg:flex-row items-center gap-6 p-6 md:p-10 bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800/50">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5">
                    <div className="flex items-center gap-2 text-sky-300">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Trending Now</span>
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                        This Month's<br />
                        <span className="text-sky-300">Record Breaking</span> Albums!
                    </h1>
                    
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-md">
                        Discover the sounds that shattered charts this month—bold, fresh, and impossible to ignore.
                    </p>
                    
                    <div className="flex gap-3 flex-wrap">
                        <button 
                            onClick={handlePlayAll}
                            className="flex items-center gap-2 rounded-full bg-white text-black py-2.5 px-6 hover:bg-gray-200 transition-colors font-semibold text-sm"
                        >
                            <Play className="w-4 h-4 fill-black" />
                            Listen Now
                        </button>
                        <button className="flex items-center gap-2 rounded-full border border-gray-600 py-2.5 px-6 hover:border-white hover:bg-white/5 transition-all font-medium text-sm text-white">
                            <Plus className="w-4 h-4" />
                            Add To Queue
                        </button>
                    </div>
                </div>

                {/* Right - Album Grid */}
                <div className="w-full lg:w-1/2 flex justify-center items-center gap-4 md:gap-6 p-2">
                    {albumSongs.map((gana, index) => (
                        <div
                            key={gana.id}
                            onClick={() => handleAlbumClick(gana)}
                            className={`
                                relative group cursor-pointer transition-all duration-300 hover:z-10
                                ${index === 1 ? 'w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 -mt-4' : 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28'}
                            `}
                        >
                            <img
                                loading="lazy"
                                className="w-full h-full object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                                src={gana.cover}
                                alt={gana.title}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Play className="w-5 h-5 text-white fill-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Albums;