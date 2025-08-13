import { useSong } from '../context/SongContext';
import { useState, useEffect, useRef } from 'react';

const MiniPlayer = () => {
    const { currentSong, isPlaying, setIsPlaying, playNextSong, playPreviousSong } = useSong();

    // 🔇 Tracks whether the volume is muted
    const [isVolumeMute, setIsVolumeMute] = useState(false);
    // track the page is up and down 

    // ⏱️ Current playback time in seconds
    const [currentTime, setCurrentTime] = useState(0);

    // ⏳ Total duration of the song in seconds
    const [duration, setDuration] = useState(0);

    // 📊 Playback progress as a percentage (0–100)
    const [progress, setProgress] = useState(0);

    // 💖 Stores liked songs as an object with song IDs as keys
    const [likedSongs, setLikedSongs] = useState({});

    // 🔈 Reference to the audio element
    const audioRef = useRef(null);

    // 💾 Load liked songs from localStorage on mount
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
        setLikedSongs(storedLikes);
    }, []);

    // 💾 Save liked songs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }, [likedSongs]);

    // ▶️ Handle play/pause based on isPlaying state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.load(); // ✅ Reload audio
            audio.play().catch(console.error);
        } else {
            audio.pause();
        }
    }, [currentSong]);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(console.error);
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // 🧹 Cleanup audio element on unmount
    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
                audio.src = '';
            }
        };
    }, []);

    // 🔇 Update mute state on audio element
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isVolumeMute;
        }
    }, [isVolumeMute]);

    // 🎵 Handle song end: reset playback state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return ;

        const handleEnded = () => {
            playNextSong();
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playNextSong]);

    // ⏱️ Update current time and progress during playback
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / (audio.duration || 1)) * 100);
        }
    };

    // ⏳ Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    };

    // ▶️ Toggle play/pause
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // 💖 Toggle like/unlike for current song
    const toggleLike = () => {
        if (!currentSong?.id) return;
        setLikedSongs((prev) => ({ ...prev, [currentSong.id]: !prev[currentSong.id] }));
    };

    // ⏩ Seek to a new time based on click position
    const handleSeek = (e) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const barWidth = rect.width;

        // Prevent seek if duration is not available
        if (!duration || !audioRef.current) return;

        const newTime = (clickX / barWidth) * duration;
        const audio = audioRef.current;

        audio.currentTime = newTime;
        setCurrentTime(newTime);

        // Resume playback if it was playing before
        if (isPlaying) {
            audio.play().catch(console.error);
        }
    };

    // ⏱️ Format time in MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // 💖 Check if current song is liked
    const isLiked = currentSong?.id ? likedSongs[currentSong.id] : false;
    if (!currentSong) return null;

    return (
        <div className="fixed md:bottom-0 bottom-16 z-50 w-full h-14 md:h-20 border-t border-gray-700 bg-[#121212] px-2  flex justify-between md:grid md:grid-cols-3 items-center gap-2 ">
            {/* Left: Song Info */}
            <div className=" hidden md:flex items-center gap-2 w-[280px] md:w-full overflow-hidden">
                <img src={currentSong.cover} alt="cover" className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover" />
                <div className="flex flex-col justify-center flex-1 overflow-hidden">
                    <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{currentSong.title}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 truncate">{currentSong.artist}</p>
                </div>
                <button onClick={toggleLike} className="text-pink-500 hover:text-pink-600 flex-shrink-0 text-lg sm:text-xl hidden md:inline-block ">
                    {isLiked ? '💖' : '🤍'}
                </button>
            </div>

            {/* Center: Controls */}
            
            <div className=" hidden md:flex flex-col gap-2 items-center w-full ">
                <div className="flex justify-center gap-2 sm:gap-4 text-lg sm:text-xl">
                    <button className='' onClick={playPreviousSong} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                        <path d="M8.06492 12.6258C8.31931 13.8374 9.67295 14.7077 12.3802 16.4481C15.3247 18.3411 16.797 19.2876 17.9895 18.9229C18.3934 18.7994 18.7654 18.5823 19.0777 18.2876C20 17.4178 20 15.6118 20 12C20 8.38816 20 6.58224 19.0777 5.71235C18.7654 5.41773 18.3934 5.20057 17.9895 5.07707C16.797 4.71243 15.3247 5.6589 12.3802 7.55186C9.67295 9.29233 8.31931 10.1626 8.06492 11.3742C7.97836 11.7865 7.97836 12.2135 8.06492 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M4 4L4 20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg></button>
                    <button className='' onClick={togglePlayPause} aria-label="Play or Pause">
                        {isPlaying ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg>}
                    </button>
                    <button className='' onClick={playNextSong}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                        <path d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M20 5V19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg></button>
                </div>
                <audio
                    key={currentSong?.id} // ✅ Forces reload
                    ref={audioRef}
                    src={currentSong.audioURL}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                />
                <div className="flex items-center gap-1 w-full px-2 ">
                    <div className="text-[10px] sm:text-xs text-gray-400 w-10  text-center">{formatTime(currentTime)}</div>
                    <div className="flex-1 h-2 bg-gray-300 rounded cursor-pointer" onClick={handleSeek}>
                        <div className="h-full bg-green-500 rounded transition-all duration-300" style={{ width: `${progress}%`, minWidth: '2px' }} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 w-10 sm:w-12 text-center">{formatTime(duration)}</div>
                </div>
            </div>
            <div className="flex md:hidden gap-2 flex-col items-center w-full ">
                <div className="flex items-center gap-1 w-full px-2 ">
                    <div className="text-[10px] sm:text-xs text-gray-400 w-10  text-center">{formatTime(currentTime)}</div>
                    <div className="flex-1 h-2 bg-gray-300 rounded cursor-pointer" onClick={handleSeek}>
                        <div className="h-full bg-green-500 rounded transition-all duration-300" style={{ width: `${progress}%`, minWidth: '2px' }} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 w-10 sm:w-12 text-center">{formatTime(duration)}</div>
                </div>
                <div className="flex justify-center gap-2 sm:gap-4 text-lg sm:text-xl">
                    <button className='' onClick={playPreviousSong} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                        <path d="M8.06492 12.6258C8.31931 13.8374 9.67295 14.7077 12.3802 16.4481C15.3247 18.3411 16.797 19.2876 17.9895 18.9229C18.3934 18.7994 18.7654 18.5823 19.0777 18.2876C20 17.4178 20 15.6118 20 12C20 8.38816 20 6.58224 19.0777 5.71235C18.7654 5.41773 18.3934 5.20057 17.9895 5.07707C16.797 4.71243 15.3247 5.6589 12.3802 7.55186C9.67295 9.29233 8.31931 10.1626 8.06492 11.3742C7.97836 11.7865 7.97836 12.2135 8.06492 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M4 4L4 20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg></button>
                    <button className='' onClick={togglePlayPause} aria-label="Play or Pause">
                        {isPlaying ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                            </svg>}
                    </button>
                    <button className='' onClick={playNextSong}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                        <path d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M20 5V19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg></button>
                </div>
            </div>

            {/* Right: Volume */}
            <div className="hidden md:flex items-center justify-end gap-2 w-full">
                <button aria-label="Volume control" onClick={() => setIsVolumeMute(!isVolumeMute)} className="text-lg sm:text-xl">
                    {isVolumeMute ? '🔇' : '🔊'}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={audioRef.current?.volume || 1}
                    onChange={(e) => {
                        if (audioRef.current) {
                            audioRef.current.volume = parseFloat(e.target.value);
                        }
                    }}
                    className="w-24"
                />
            </div>
        </div>

    );
};

export default MiniPlayer;