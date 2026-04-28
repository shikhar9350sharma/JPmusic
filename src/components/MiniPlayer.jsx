import { useState, useEffect, useRef, useCallback, memo } from 'react';
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
  Shuffle
} from 'lucide-react';

// sub-components OUTSIDE the main component
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

const MiniPlayer = memo(function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    playNextSong,
    playPreviousSong
  } = useSong();

  const [isVolumeMute, setIsVolumeMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [likedSongs, setLikedSongs] = useState({});
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  // Load liked songs
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
    setLikedSongs(storedLikes);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Handle song changes properly - DON'T reload if same song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioURL) return;

    // Only load if src changed
    if (audio.src !== currentSong.audioURL) {
      audio.src = currentSong.audioURL;
      audio.load();
    }

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(console.error);
      }
    }
  }, [currentSong?.audioURL, isPlaying]);

  // Handle play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(console.error);
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Cleanup
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Mute toggle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isVolumeMute;
    }
  }, [isVolumeMute]);

  // Song ended
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        playNextSong();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [isRepeat, playNextSong]);

  // Use requestAnimationFrame for smooth progress without excessive re-renders
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setCurrentTime(audio.currentTime);
      const newProgress = (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress(newProgress);
    });
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const toggleLike = useCallback(() => {
    if (!currentSong?.id) return;
    setLikedSongs((prev) => ({
      ...prev,
      [currentSong.id]: !prev[currentSong.id]
    }));
  }, [currentSong?.id]);

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
  }, [duration, isPlaying]);

  const formatTime = useCallback((time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, []);

  const isLiked = currentSong?.id ? likedSongs[currentSong.id] : false;
  if (!currentSong) return null;

  return (
    <div className="fixed md:bottom-0 bottom-16 z-50 w-full h-16 md:h-24 bg-[#121212] border-t border-gray-800 px-4 flex items-center gap-4 select-none">
      {/* Left: Song Info */}
      <div className="hidden md:flex items-center gap-3 w-1/4 min-w-0">
        <img
          src={currentSong.cover}
          alt="cover"
          className="w-14 h-14 rounded-lg object-cover shadow-md"
        />
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white truncate">{currentSong.title}</h3>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <button onClick={toggleLike} className={`transition-colors ${isLiked ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}>
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
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
          onToggle={togglePlayPause}
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
          onToggle={togglePlayPause}
          onNext={playNextSong}
          onRepeat={() => setIsRepeat(!isRepeat)}
          onSeek={handleSeek}
          formatTime={formatTime}
        />
      </div>

      {/* Right: Volume */}
      <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
        <button onClick={() => setIsVolumeMute(!isVolumeMute)} className="text-gray-400 hover:text-white transition-colors p-1">
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

      {/* ✅ FIX: Remove key prop - let React keep the same audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
    </div>
  );
});

export default MiniPlayer;