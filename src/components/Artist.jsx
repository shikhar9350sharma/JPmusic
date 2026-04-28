import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic2, ChevronRight, Users, Play } from 'lucide-react';

const Artist = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/artists')
            .then((res) => res.json())
            .then((data) => setArtists(data))
            .catch((err) => console.error('Fetch error from Artist:', err));
    }, []);

    const handleArtistClick = (artist) => {
        navigate(`/app/artists/${artist.id}`);
    };

    return (
        <div className="py-6 px-4 md:px-0">
            <div className="flex flex-col items-start gap-4">
                {/* Header */}
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Mic2 className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
                            Artists
                        </h2>
                    </div>
                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group">
                        See All
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                {/* Artists Carousel */}
                <div className="w-full overflow-x-auto scroll-hidden pb-4">
                    <div className="flex gap-4 md:gap-5 md:mt-2 md:ml-2">
                        {artists.map((artist) => (
                            <div
                                key={artist.id}
                                onClick={() => handleArtistClick(artist)}
                                className="group w-28 sm:w-32 md:w-36 lg:w-44 flex-shrink-0 cursor-pointer"
                            >
                                {/* Artist Image - Circular */}
                                <div className="relative w-full aspect-square mb-3">
                                    <img
                                        loading="lazy"
                                        className="w-full h-full object-cover rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                                        src={artist.cover}
                                        alt={artist.title}
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                        </div>
                                    </div>
                                    {/* Verified Badge (if you have this data) */}
                                    {/* <div className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                                        <Users className="w-3 h-3 text-white" />
                                    </div> */}
                                </div>

                                {/* Artist Info */}
                                <div className="text-center px-1">
                                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                                        {artist.title}
                                    </h3>
                                    <span className="text-xs text-gray-400 truncate block mt-0.5">
                                        {artist.bio || 'Artist'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;