import { useEffect, useState } from 'react';
import { Music2, Loader2, AlertCircle, Grid3X3, List } from 'lucide-react';
import SongCards from './SongCards';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        setIsLoading(true);
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => {
                setSongs(data.slice(0, 16));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('Fetching songs error: ', err);
                setError('Failed to load songs. Please try again.');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-gray-400 text-sm">Loading songs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <p className="text-gray-400 text-center max-w-md">{error}</p>
            </div>
        );
    }

    return (
        <div className="py-6 px-4 md:px-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Music2 className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        All Songs
                    </h2>
                    <span className="text-xs text-gray-500 bg-[#2b2b2b] px-2 py-1 rounded-full">
                        {songs.length}
                    </span>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-[#2b2b2b] rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${
                            viewMode === 'grid' 
                                ? 'bg-[#3b3b3b] text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${
                            viewMode === 'list' 
                                ? 'bg-[#3b3b3b] text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Songs Grid */}
            <div className={`
                ${viewMode === 'grid' 
                    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6' 
                    : 'flex flex-col gap-2'
                }
            `}>
                {songs.map((song) => (
                    <SongCards 
                        key={song.id} 
                        song={song} 
                        viewMode={viewMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default SongList;