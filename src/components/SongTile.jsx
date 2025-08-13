import React from 'react'
const SongTile = ({ song, isLiked, onLike, onSelect}) => {
   
  return (
    <>
      
      <div
        className="flex items-center justify-between  p-3 hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
        onClick={onSelect}
      >
        {/* Left: Thumbnail & Info */}
        <div className="flex items-center sm:flex-row sm:justify-between sm:items-center space-x-4">
          <img
            src={song.cover}
            alt={song.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h3 className="text-xs md:text-sm font-semibold text-white">{song.title}</h3>
            <p className="text-[10px] md:text-xs text-gray-400">{song.artist}</p>
          </div>
        </div>

        {/* Right: Duration & Like */}
        <div className="flex items-center space-x-4">
          <span className="text-[10px] md:text-xs text-gray-300">{song.duration}</span>
          <button
            className="text-pink-500 hover:text-pink-600 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onSelect
              onLike();
            }}
          >
            {isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4.004 4.004 0 015.656 0L10 6.343l1.172-1.171a4.004 4.004 0 115.656 5.656L10 17.657l-6.828-6.829a4.004 4.004 0 010-5.656z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364 4.318 12.682a4.5 4.5 0 010-6.364z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default SongTile;



