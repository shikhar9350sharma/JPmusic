import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  Headphones,
  Music2,
  ListMusic,
  Mic2,
  Link2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { useSong } from '../context/SongContext';
import SongTile from './SongTile';

const PlayerPage = () => {
  const {
    currentSong,
    setCurrentSong,
    playerSongs,
    setPlayerSongs,
    setCurrentIndex,
    currentIndex,
    likedSongs,
    toggleLike,
    setIsPlaying,
    isPlaying,
    audioRef,
    togglePlay,
    playNextSong,
    playPreviousSong,
    setShowMiniPlayer,
    playSong,
    skipToSong
  } = useSong();

  const [activeTab, setActiveTab] = useState('up next');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  // Fetch song if not in context
  useEffect(() => {
    if (!currentSong && id) {
      fetch('https://music-api-gamma.vercel.app/songs')
        .then((res) => res.json())
        .then((data) => {
          const song = data.find((s) => s.id === id);
          if (song) {
            const related = data.filter((s) => s.artistID === song.artistID);
            // Use playSong to properly initialize everything
            const index = related.findIndex((s) => s.id === song.id);
            playSong(song, related, index !== -1 ? index : 0);
          }
        })
        .catch((err) => console.error('Failed to fetch song by ID:', err));
    }
  }, [id, currentSong, playSong]);

  // Fetch related songs if playerSongs is empty
  useEffect(() => {
    if (!playerSongs.length && currentSong?.artistID) {
      fetch('https://music-api-gamma.vercel.app/songs')
        .then((res) => res.json())
        .then((data) => {
          const related = data.filter(
            (song) => song.artistID === currentSong.artistID
          );
          setPlayerSongs(related);
          const index = related.findIndex((s) => s.id === currentSong.id);
          if (index !== -1) setCurrentIndex(index);
        })
        .catch((err) => console.error('Failed to fetch fallback songs:', err));
    }
  }, [playerSongs.length, currentSong, setPlayerSongs, setCurrentIndex]);

  // Sync with shared audioRef - track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
        setProgress((audio.currentTime / (audio.duration || 1)) * 100);
      });
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        playNextSong();
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [audioRef, playNextSong, isRepeat]);

  // Handle close/minimize - return to previous page
  const handleClose = () => {
    setShowMiniPlayer(true); // Keep mini player visible
    navigate(-1); // Go back to previous page
  };

  // Seek functionality
  const handleSeek = useCallback((e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    
    if (audioRef.current && duration) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percent * 100);
      
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [duration, isPlaying, audioRef]);

  // Volume control
  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  // Format time display
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'up next', label: 'Up Next', icon: ListMusic },
    { id: 'lyrics', label: 'Lyrics', icon: Mic2 },
    { id: 'related', label: 'Related', icon: Link2 }
  ];

  if (!currentSong) {
    return (
      <div className="fixed inset-0 bg-[#121212] z-40 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Music2 className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-lg">No song selected</p>
          <button
            onClick={() => navigate('/app')}
            className="text-emerald-500 hover:text-emerald-400 font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#121212] z-40 overflow-y-auto scroll-hidden">
      {/* Header with Close/Minimize Button */}
      <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-md z-10 px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <button
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
        <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Now Playing</span>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Panel - Large Cover & Controls */}
          <div className="lg:w-1/2 flex flex-col items-center gap-6">
            
            {/* Large Cover Image */}
            <div className="w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-100' : 'scale-95'
                }`}
              />
            </div>

            {/* Song Info & Like */}
            <div className="w-full max-w-[400px] flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-white truncate">{currentSong.title}</h1>
                <p className="text-gray-400 text-lg">{currentSong.artist}</p>
              </div>
              <button
                onClick={() => toggleLike(currentSong.id)}
                className={`p-3 rounded-full transition-colors flex-shrink-0 ${
                  likedSongs[currentSong.id] ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart 
                  className="w-7 h-7" 
                  fill={likedSongs[currentSong.id] ? 'currentColor' : 'none'} 
                />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-[400px] space-y-2">
              <div 
                ref={progressRef}
                className="h-1.5 bg-[#333] rounded-full cursor-pointer group"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-emerald-500 rounded-full relative transition-all duration-100"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Playback Controls */}
            <div className="w-full max-w-[400px] flex items-center justify-between">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-2 rounded-full transition-colors ${
                  isShuffle ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={playPreviousSong}
                className="p-3 text-white hover:text-emerald-400 transition-colors"
              >
                <SkipBack className="w-8 h-8" fill="currentColor" />
              </button>

              <button
                onClick={togglePlay}
                className="p-4 bg-white rounded-full text-black hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                )}
              </button>

              <button
                onClick={playNextSong}
                className="p-3 text-white hover:text-emerald-400 transition-colors"
              >
                <SkipForward className="w-8 h-8" fill="currentColor" />
              </button>

              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`p-2 rounded-full transition-colors ${
                  isRepeat ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 w-full max-w-[400px]">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="flex-1 h-1 bg-[#333] rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{currentSong.likes?.toLocaleString() || 0} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                <span>{currentSong.monthlyListeners?.toLocaleString() || 0} monthly</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Tabs & Queue */}
          <div className="lg:w-1/2 flex flex-col min-h-0">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-800 pb-4 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content - Fixed scrolling */}
            <div className="flex-1 min-h-0 overflow-y-auto scroll-hidden">
              {activeTab === 'lyrics' && (
                <div className="py-4">
                  <div className="bg-[#1b1b1b] rounded-xl p-6">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                      {currentSong.lyrics || (
                        <span className="text-gray-500 italic">No lyrics available.</span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'related' && (
                <div className="py-4 space-y-3">
                  {['Related Song 1', 'Related Song 2', 'Related Artist'].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#1b1b1b] hover:bg-[#252525] transition-colors cursor-pointer"
                    >
                      <Link2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'up next' && (
                <div className="py-2 space-y-1">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <ListMusic className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-white">Up Next</h3>
                    </div>
                    <span className="text-xs text-gray-500">{playerSongs.length} songs</span>
                  </div>
                  {playerSongs.map((song, i) => (
                    <SongTile
                      key={song.id}
                      song={song}
                      isActive={i === currentIndex}
                      isLiked={likedSongs[song.id] ?? false}
                      onLike={() => toggleLike(song.id)}
                      onSelect={() => {
                        // Use skipToSong for proper audio sync
                        skipToSong(i);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;