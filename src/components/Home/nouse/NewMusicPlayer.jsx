import  { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const NewMusicPlayer = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [likedSongs, setLikedSongs] = useState({});
    const [isVolumeMute, setIsVolumeMute] = useState(false);

    const audioRef = useRef(null);

    // Fetch song details
    useEffect(() => {
        fetch(`http://localhost:3001/songs/${id}`)
            .then((res) => res.json())
            .then((data) => setSong(data))
            .catch((err) => console.error('Music player details not found', err));
    }, [id]);

    // Load liked songs from localStorage
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
        setLikedSongs(storedLikes);
    }, []);

    // Save liked songs to localStorage
    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }, [likedSongs]);

    // Update mute state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isVolumeMute;
        }
    }, [isVolumeMute]);

    // Update time and progress
    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / (audio.duration || 1)) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const toggleLike = () => {
        if (!song?.id) return;
        setLikedSongs((prev) => ({ ...prev, [song.id]: !prev[song.id] }));
    };

    const handleSeek = (e) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const barWidth = rect.width;
        const newTime = (clickX / barWidth) * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    if (!song) {
        return <div className="text-white">Loading song details...</div>;
    }

    const isLiked = likedSongs[song.id];

    return (
        <div className=" music-player border border-white bg-black text-white p-4 rounded shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">{song.title}</h2>
            <p className="text-sm text-gray-300 mb-4">{song.artist}</p>

            <audio
                ref={audioRef}
                src={song.audioURL}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                autoPlay={isPlaying}
            />

            <div className="flex items-center justify-between mb-4">
                <button onClick={togglePlayPause} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={toggleLike} className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-700">
                    {isLiked ? '💖 Liked' : '🤍 Like'}
                </button>
                <button onClick={() => setIsVolumeMute(!isVolumeMute)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800">
                    {isVolumeMute ? '🔇' : '🔊'}
                </button>
            </div>

            <div className="progress-bar bg-gray-700 h-2 rounded cursor-pointer" onClick={handleSeek}>
                <div
                    className="progress bg-green-500 h-2 rounded"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-sm text-gray-400 mt-2">
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
        </div>
    );
};

export default NewMusicPlayer;