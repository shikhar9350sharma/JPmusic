import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSong } from '../context/SongContext';
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  Repeat,
  Shuffle,
  Maximize2
} from 'lucide-react';

// ==================== MOBILE CONTROLS ====================
const MobilePlayer = memo(function MobilePlayer({
  currentTime,
  duration,
  progress,
  isPlaying,
  onSeek,
  onPrev,
  onToggle,
  onNext,
  formatTime
}) {
  return (
    <div className="flex md:hidden flex-col items-center w-full gap-1 px-2">
      <div className="flex items-center gap-2 w-full">
        <span className="text-[10px] text-gray-400 w-8 text-center flex-shrink-0">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
          onClick={onSeek}
        >
          <div
            className="h-full bg-emerald-500 rounded-full relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <span className="text-[10px] text-gray-400 w-8 text-center flex-shrink-0">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button onClick={onPrev} className="text-gray-400 hover:text-white p-1">
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        <button
          onClick={onToggle}
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-black fill-black" />
          ) : (
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          )}
        </button>
        <button onClick={onNext} className="text-gray-400 hover:text-white p-1">
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
});

// ==================== DESKTOP CONTROLS ====================
const DesktopPlayer = memo(function DesktopPlayer({
  currentTime,
  duration,
  progress,
  isPlaying,
  isShuffle,
  isRepeat,
  onShuffle,
  onPrev,
  onToggle,
  onNext,
  onRepeat,
  onSeek,
  formatTime
}) {
  return (
    <div className="hidden md:flex flex-col items-center w-full max-w-xl gap-2">
      <div className="flex items-center gap-5">
        <button onClick={onShuffle} className={`p-1 ${isShuffle ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}>
          <Shuffle className="w-4 h-4" />
        </button>
        <button onClick={onPrev} className="text-gray-300 hover:text-white p-1">
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        <button
          onClick={onToggle}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-95 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black fill-black" />
          ) : (
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          )}
        </button>
        <button onClick={onNext} className="text-gray-300 hover:text-white p-1">
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
        <button onClick={onRepeat} className={`p-1 ${isRepeat ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}>
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 w-full px-4">
        <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
        <div className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group" onClick={onSeek}>
          <div className="h-full bg-emerald-500 rounded-full relative" style={{ width: `${Math.min(progress, 100)}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md" />
          </div>
        </div>
        <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
      </div>
    </div>
  );
});

// ==================== MAIN MINI PLAYER ====================
const MiniPlayer = memo(function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    playNextSong,
    playPreviousSong,
    likedSongs,
    toggleLike,
    audioRef,
    showMiniPlayer,
    togglePlay
  } = useSong();

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ ALL useState hooks FIRST — before any conditionals
  const [isVolumeMute, setIsVolumeMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // ALL useRef hooks NEXT
  const rafRef = useRef(null);

  // ALL useEffect hooks HERE 
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCurrentTime(audio.currentTime);
        const newProgress = (audio.currentTime / (audio.duration || 1)) * 100;
        setProgress(newProgress);
      });
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        playNextSong();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [audioRef, isRepeat, playNextSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioURL) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(console.error);
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong?.audioURL, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isVolumeMute;
    }
  }, [isVolumeMute, audioRef]);

  //  ALL useCallback hooks HERE
  const handleSeek = useCallback((e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = rect.width;
    const audio = audioRef.current;

    if (!duration || !audio) return;

    const newTime = (clickX / barWidth) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);

    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [duration, isPlaying, audioRef]);

  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, []);

  // conditional returns — AFTER all hooks
  if (!showMiniPlayer || !currentSong) return null;

  const isOnPlayerPage = location.pathname.includes('/songs/');
  if (isOnPlayerPage) return null;

  // Navigate to full player page
  const expandPlayer = () => {
    if (currentSong?.id) {
      navigate(`/app/songs/${currentSong.id}`);
    }
  };

  const isLiked = currentSong?.id ? likedSongs[currentSong.id] : false;

  return (
    <>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-gray-800 px-4 flex items-center gap-4 select-none h-16 md:h-24">
        
        {/* Left: Song Info - Click to expand */}
        <div 
          className="hidden md:flex items-center gap-3 w-1/4 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={expandPlayer}
        >
          <img
            src={currentSong.cover}
            alt="cover"
            className="w-14 h-14 rounded-lg object-cover shadow-md"
          />
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white truncate">{currentSong.title}</h3>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(currentSong.id);
            }} 
            className={`transition-colors ${isLiked ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Mobile: Compact song info */}
        <div 
          className="flex md:hidden items-center gap-3 flex-shrink-0 cursor-pointer"
          onClick={expandPlayer}
        >
          <img
            src={currentSong.cover}
            alt="cover"
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex flex-col justify-center max-w-[120px]">
            <h3 className="text-xs font-semibold text-white truncate">{currentSong.title}</h3>
            <p className="text-[10px] text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex-1 flex justify-center">
          <MobilePlayer
            currentTime={currentTime}
            duration={duration}
            progress={progress}
            isPlaying={isPlaying}
            onSeek={handleSeek}
            onPrev={playPreviousSong}
            onToggle={togglePlay}
            onNext={playNextSong}
            formatTime={formatTime}
          />
          <DesktopPlayer
            currentTime={currentTime}
            duration={duration}
            progress={progress}
            isPlaying={isPlaying}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            onShuffle={() => setIsShuffle(!isShuffle)}
            onPrev={playPreviousSong}
            onToggle={togglePlay}
            onNext={playNextSong}
            onRepeat={() => setIsRepeat(!isRepeat)}
            onSeek={handleSeek}
            formatTime={formatTime}
          />
        </div>

        {/* Right: Volume + Expand */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <button 
            onClick={expandPlayer}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Expand"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsVolumeMute(!isVolumeMute)} 
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isVolumeMute ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            onChange={(e) => {
              if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
            }}
            className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Mobile: Expand button */}
        <button 
          onClick={expandPlayer}
          className="md:hidden text-gray-400 hover:text-white p-1"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </>
  );
});

export default MiniPlayer;