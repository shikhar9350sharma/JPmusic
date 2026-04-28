import { Heart, Play, Clock, Music2, MoreVertical } from 'lucide-react';

const SongTile = ({ song, isActive, isLiked, onLike, onSelect }) => {
  return (
    <div
      className={`
        group flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer
        ${isActive 
          ? 'bg-emerald-500/10 border border-emerald-500/20' 
          : 'hover:bg-[#2b2b2b] border border-transparent'
        }
      `}
      onClick={onSelect}
    >
      {/* Left: Thumbnail & Info */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        {/* Cover with Play Overlay */}
        <div className="relative flex-shrink-0">
          <img
            src={song.cover}
            alt={song.title}
            className={`
              w-11 h-11 md:w-12 md:h-12 rounded-lg object-cover transition-opacity
              ${isActive ? 'opacity-100' : 'group-hover:opacity-75'}
            `}
          />
          {/* Active/Play Indicator */}
          <div className={`
            absolute inset-0 flex items-center justify-center rounded-lg
            ${isActive ? 'bg-emerald-500/20' : 'bg-black/40 opacity-0 group-hover:opacity-100'}
            transition-opacity
          `}>
            {isActive ? (
              <div className="flex items-end gap-0.5 h-4">
                <div className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1s_infinite]" style={{ height: '60%' }} />
                <div className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_1.2s_infinite]" style={{ height: '100%' }} />
                <div className="w-0.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '40%' }} />
              </div>
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </div>
        </div>

        {/* Song Info */}
        <div className="min-w-0 flex-1">
          <h3 className={`
            text-sm font-semibold truncate transition-colors
            ${isActive ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'}
          `}>
            {song.title}
          </h3>
          <div className="flex items-center gap-1">
            <Music2 className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
          </div>
        </div>
      </div>

      {/* Right: Duration & Like */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 ml-2">
        {/* Duration */}
        <div className="hidden sm:flex items-center gap-1 text-gray-500">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{song.duration || '3:45'}</span>
        </div>

        {/* Like Button */}
        <button
          className={`
            p-1.5 rounded-full transition-all duration-200
            ${isLiked 
              ? 'text-emerald-500 hover:text-emerald-400' 
              : 'text-gray-500 hover:text-white opacity-0 group-hover:opacity-100'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
        >
          <Heart 
            className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-current' : ''}`} 
          />
        </button>

        {/* More Options (visible on hover) */}
        <button 
          className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SongTile;