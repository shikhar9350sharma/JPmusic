import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Play,
  ChevronLeft,
  ChevronRight,
  Music2,
  Clock,
  Disc3,
  Mic2
} from 'lucide-react';
import { useSong } from '../context/SongContext';
import {CarouselSkeleton} from './SkeletonLoader';

const English = () => {
  const scrollRef = useRef(null);
  const [englishSongs, setEnglishSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playSong } = useSong();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('https://music-api-gamma.vercel.app/english')
      .then((res) => res.json())
      .then((data) => {
        const slicedSongs = data.slice(0, 8);
        setEnglishSongs(slicedSongs);
      })
      .catch((err) =>console.log('Fetching english songs error: ', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleEnglishClick = (gana) => {
    const index = englishSongs.findIndex((s) => s.id === gana.id);
    playSong(gana, englishSongs, index);
    navigate(`/app/songs/${gana.id}`);
  };

  const handlePlayAll = useCallback(() => {
    if (englishSongs.length > 0) {
      playSong(englishSongs[0], englishSongs, 0);
      navigate(`/app/songs/${englishSongs[0].id}`);
    }
  }, [englishSongs, playSong, navigate]);

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
      <CarouselSkeleton />
    );
  }

  return (
    <div className="py-6 px-4 md:px-0 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white hover:cursor-pointer hover:underline decoration-2 underline-offset-4">
            English Beats
          </h2>
        </div>

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

      <div ref={scrollRef} className="w-full overflow-x-auto scroll-hidden pb-4">
        <div className="flex gap-4 md:gap-5">
          {englishSongs.map((gana, index) => (
            <div
              key={gana.id}
              className="group w-28 sm:w-32 md:w-36 lg:w-44 flex-shrink-0 cursor-pointer"
            >
              <div
                onClick={() => handleEnglishClick(gana)}
                className="relative w-full aspect-square mb-3"
              >
                <img
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                  src={gana.cover}
                  alt={gana.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase">EN</span>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
              </div>

              <div className="min-w-0 px-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                  {gana.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                  <Mic2 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{gana.artist}</span>
                </div>
                {gana.album && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                    <Disc3 className="w-3 h-3 flex-shrink-0" />
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default English;