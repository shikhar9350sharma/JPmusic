import { useNavigate } from 'react-router-dom';
import { Play, Music2, User, Clock, Heart, Disc3 } from 'lucide-react';
import { useSong } from '../context/SongContext';

const SongCards = ({ song, viewMode = 'grid' }) => {
  const { setCurrentSong, setIsPlaying, likedSongs, toggleLike } = useSong();
  const navigate = useNavigate();

  const handlePlay = () => {
    setCurrentSong(song);
    setIsPlaying(true);
    navigate(`/app/songs/${song.id}`);
  };

  const isLiked = song?.id ? likedSongs[song.id] : false;

  // List View
  if (viewMode === 'list') {
    return (
      <div
        onClick={handlePlay}
        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2b2b] transition-all duration-200 cursor-pointer"
      >
        {/* Cover Image */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
            {song.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{song.artist}</span>
          </div>
        </div>

        {/* Album */}
        {song.album && (
          <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 w-32">
            <Disc3 className="w-3 h-3" />
            <span className="truncate">{song.album}</span>
          </div>
        )}

        {/* Duration */}
        {song.duration && (
          <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
            <Clock className="w-3 h-3" />
            <span>{song.duration}</span>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song.id);
          }}
          className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
            isLiked ? 'text-emerald-500' : 'text-gray-500 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div
      onClick={handlePlay}
      className="group flex flex-col gap-3 cursor-pointer w-full"
    >
      {/* Cover Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          src={song.cover}
          alt={song.title}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          {/* Play Button */}
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(song.id);
            }}
            className={`p-2 rounded-full bg-black/40 backdrop-blur-sm transition-colors ${
              isLiked ? 'text-emerald-500' : 'text-white hover:text-emerald-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Duration Badge */}
        {song.duration && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-300" />
            <span className="text-[10px] font-medium text-gray-300">{song.duration}</span>
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="px-1 space-y-1">
        <h3 className="text-sm md:text-base font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
          {song.title}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <User className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{song.artist}</span>
        </div>
        {song.album && (
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Music2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{song.album}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCards;