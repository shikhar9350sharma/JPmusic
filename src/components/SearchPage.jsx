import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Music2,
  Disc3,
  User,
  Clock,
  Play,
  Frown,
  ArrowLeft,
  Filter
} from 'lucide-react';
import { useSong } from '../context/SongContext';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentSong, setCurrentIndex, setPlayerSongs, setIsPlaying } = useSong();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSongs = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const res = await fetch('https://music-api-gamma.vercel.app/songs');
        const data = await res.json();

        const filtered = data.filter((song) =>
          (song.title?.toLowerCase().includes(query.toLowerCase())) ||
          (song.artist?.toLowerCase().includes(query.toLowerCase())) ||
          (song.album?.toLowerCase().includes(query.toLowerCase()))
        );

        setResults(filtered);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [query]);

  const handleSongClick = (song, index) => {
    setPlayerSongs(results);
    setCurrentSong(song);
    setCurrentIndex(index);
    setIsPlaying(true);
    navigate(`/app/songs/${song.id}`);
  };

  const getFilterCount = (type) => {
    if (type === 'all') return results.length;
    return results.filter(s => 
      type === 'songs' ? s.title?.toLowerCase().includes(query.toLowerCase()) :
      type === 'artists' ? s.artist?.toLowerCase().includes(query.toLowerCase()) :
      s.album?.toLowerCase().includes(query.toLowerCase())
    ).length;
  };

  const filteredResults = filterType === 'all' ? results : results.filter(s => 
    filterType === 'songs' ? s.title?.toLowerCase().includes(query.toLowerCase()) :
    filterType === 'artists' ? s.artist?.toLowerCase().includes(query.toLowerCase()) :
    s.album?.toLowerCase().includes(query.toLowerCase())
  );

  const filters = [
    { id: 'all', label: 'All', icon: Music2 },
    { id: 'songs', label: 'Songs', icon: Play },
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'albums', label: 'Albums', icon: Disc3 },
  ];

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Search className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0 pb-32">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-[#2b2b2b] hover:bg-[#3b3b3b] transition-colors md:hidden"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Search className="w-4 h-4" />
            <span>Search results</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            "{query}"
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </div>
      </div>

      {/* Filters */}
      {results.length > 0 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scroll-hidden pb-2">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${filterType === filter.id
                  ? 'bg-white text-black'
                  : 'bg-[#2b2b2b] text-gray-400 hover:text-white hover:bg-[#3b3b3b]'
                }
              `}
            >
              <filter.icon className="w-3.5 h-3.5" />
              {filter.label}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${filterType === filter.id ? 'bg-gray-200 text-black' : 'bg-[#1b1b1b] text-gray-500'}
              `}>
                {getFilterCount(filter.id)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Frown className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
          <p className="text-gray-400 text-center max-w-md">
            We couldn't find any songs, artists, or albums matching "{query}".
            Try checking your spelling or use different keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredResults.map((song, index) => (
            <div
              key={song.id}
              onClick={() => handleSongClick(song, index)}
              className="group bg-[#1b1b1b] border border-gray-800 hover:border-gray-600 rounded-xl p-3 hover:bg-[#252525] transition-all duration-200 cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Song Info */}
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                  {song.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <User className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{song.artist}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Disc3 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{song.album}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>{song.duration || '3:45'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;