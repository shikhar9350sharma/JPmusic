import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Play,
  ChevronLeft,
  ChevronRight,
  Music2,
  Clock,
  Disc3
} from 'lucide-react';
import { useSong } from '../context/SongContext';

const NewRlease = () => {
  const scrollRef = useRef(null);
  const [newReleaseSongs, setNewReleaseSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('https://music-api-gamma.vercel.app/newrelease')
      .then((res) => res.json())
      .then((data) => {
        const slicedSongs = data.slice(0, 8);
        setNewReleaseSongs(slicedSongs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Fetching new release error: ', err);
        setIsLoading(false);
      });
  }, []);

  const handleNewReleaseClick = (gana) => {
    const index = newReleaseSongs.findIndex((s) => s.id === gana.id);
    setPlayerSongs(newReleaseSongs);
    setCurrentSong(gana);
    setCurrentIndex(index);
    setIsPlaying(true);
    navigate(`/app/songs/${gana.id}`);
  };

  const handlePlayAll = useCallback(() => {
    if (newReleaseSongs.length > 0) {
      setPlayerSongs(newReleaseSongs);
      setCurrentSong(newReleaseSongs[0]);
      setCurrentIndex(0);
      setIsPlaying(true);
      navigate(`/app/songs/${newReleaseSongs[0].id}`);
    }
  }, [newReleaseSongs]);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="py-6 px-4 md:px-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-white" />
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
    <div className="py-6 px-4 md:px-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
            New Released
          </h2>
        </div>

        {/* Scroll Controls + Play All */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full bg-[#2b2b2b] hover:bg-[#3b3b3b] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full bg-[#2b2b2b] hover:bg-[#3b3b3b] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
          <button
            onClick={handlePlayAll}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            Play All
            <Play className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scrollable Songs */}
      <div ref={scrollRef} className="w-full overflow-x-auto scroll-hidden pb-4">
        <div className="flex gap-4 md:gap-5">
          {newReleaseSongs.map((gana, index) => (
            <div
              key={gana.id}
              className="group w-28 sm:w-32 md:w-36 lg:w-44 flex-shrink-0 cursor-pointer"
            >
              {/* Cover Image */}
              <div
                onClick={() => handleNewReleaseClick(gana)}
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
                {/* New Badge */}
                <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-black" />
                  <span className="text-[10px] font-bold text-black uppercase">New</span>
                </div>
                {/* Track Number */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
              </div>

              {/* Song Info */}
              <div className="min-w-0 px-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-yellow-400 transition-colors">
                  {gana.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                  <Music2 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{gana.artist}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                  <Disc3 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{gana.album || 'Single'}</span>
                </div>
                {gana.duration && (
                  <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{gana.duration}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewRlease;