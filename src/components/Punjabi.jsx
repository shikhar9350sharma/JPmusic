import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Play, ChevronRight, Flame, Disc3, Clock } from 'lucide-react';
import { useSong } from '../context/SongContext';

const Punjabi = () => {
  const [punjabiSongs, setPunjabiSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentSong, setCurrentIndex, setPlayerSongs, setIsPlaying } = useSong();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('https://music-api-gamma.vercel.app/punjabi')
      .then((res) => res.json())
      .then((data) => {
        const slicedSongs = data.slice(0, 12);
        setPunjabiSongs(slicedSongs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error from Punjabi:', err);
        setIsLoading(false);
      });
  }, []);

  const handlePunjabiClick = (gana) => {
    const index = punjabiSongs.findIndex((s) => s.id === gana.id);
    setPlayerSongs(punjabiSongs);
    setCurrentSong(gana);
    setCurrentIndex(index);
    setIsPlaying(true);
    navigate(`/app/songs/${gana.id}`);
  };

  const handlePlayAll = () => {
    if (punjabiSongs.length > 0) {
      setPlayerSongs(punjabiSongs);
      setCurrentSong(punjabiSongs[0]);
      setCurrentIndex(0);
      setIsPlaying(true);
      navigate(`/app/songs/${punjabiSongs[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="py-6 px-4 md:px-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center animate-pulse">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-32 h-40 bg-gray-800 rounded-xl animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-6 px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
            Punjabi Mixture
          </h2>
        </div>
        <button
          onClick={handlePlayAll}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
        >
          Play All
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Songs Grid - Responsive */}
      <div className="w-full overflow-x-auto scroll-hidden pb-2">
        <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 min-w-max md:min-w-0">
          {punjabiSongs.map((gana) => (
            <div
              key={gana.id}
              onClick={() => handlePunjabiClick(gana)}
              className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#2b2b2b] transition-all duration-200 cursor-pointer min-w-[280px] md:min-w-0"
            >
              {/* Cover Image with Play Overlay */}
              <div className="relative flex-shrink-0">
                <img
                  loading="lazy"
                  src={gana.cover}
                  alt={gana.title}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Song Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm truncate group-hover:text-orange-400 transition-colors">
                  {gana.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                  <Music2 className="w-3 h-3" />
                  <span className="truncate">{gana.artist}</span>
                </div>
                {gana.album && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                    <Disc3 className="w-3 h-3" />
                    <span className="truncate">{gana.album}</span>
                  </div>
                )}
                {gana.duration && (
                  <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{gana.duration}</span>
                  </div>
                )}
              </div>

              {/* Hover Action */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Punjabi;