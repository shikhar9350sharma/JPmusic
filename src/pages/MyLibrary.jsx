import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Library,
  Play,
  Disc3,
  Music2,
  Clock,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

const MyLibrary = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://music-api-gamma.vercel.app/albums')
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error from Library:', err);
        setError('Failed to load albums. Please try again.');
        setIsLoading(false);
      });
  }, []);

  const handleLibraryClick = (album) => {
    navigate(`/app/librarypage/${album.id}`);
  };

  const handlePlayAlbum = (e, album) => {
    e.stopPropagation();
    // Optional: Play first song of album
    navigate(`/app/librarypage/${album.id}`);
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-gray-400 text-sm">Loading your library...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-gray-400 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Library className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Your Library
          </h2>
          <span className="text-xs text-gray-500 bg-[#2b2b2b] px-2 py-1 rounded-full">
            {albums.length} albums
          </span>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => handleLibraryClick(album)}
            className="group flex flex-col items-center rounded-xl p-3 md:p-4 gap-3 bg-[#1b1b1b] border border-gray-800 hover:border-gray-600 hover:bg-[#252525] transition-all duration-300 cursor-pointer"
          >
            {/* Album Cover */}
            <div className="relative w-full aspect-square overflow-hidden rounded-lg">
              <img
                src={album.albumcover}
                alt={album.albumname}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => handlePlayAlbum(e, album)}
                  className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </button>
              </div>
              {/* Album Badge */}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                <Disc3 className="w-3 h-3 text-gray-300" />
                <span className="text-[10px] text-gray-300">Album</span>
              </div>
            </div>

            {/* Album Info */}
            <div className="w-full text-center space-y-1">
              <h3 className="text-sm md:text-base font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                {album.albumname}
              </h3>
              {album.artist && (
                <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                  <Music2 className="w-3 h-3" />
                  <span className="truncate">{album.artist}</span>
                </div>
              )}
              {album.songCount && (
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{album.songCount} songs</span>
                </div>
              )}
            </div>

            {/* Hover Arrow */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {albums.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Library className="w-16 h-16 text-gray-600" />
          <p className="text-gray-400 text-lg">Your library is empty</p>
          <p className="text-gray-500 text-sm">Start exploring to add albums</p>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;