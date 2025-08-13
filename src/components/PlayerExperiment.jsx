import { useSong } from '../context/SongContext';
import { useState, useEffect, useRef } from 'react';
import SongTile from './SongTile';

const PlayerPage = () => {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying,isPagedown } = useSong();
    const [activeTab, setActiveTab] = useState('Up Next')
    const [lyrics, setLyrics] = useState([])
    const [songs, setSongs] = useState([])
    const [likedsongs, setLikedSongs] = useState({})
    const [hideLeftPanel, setHideLeftPanel] = useState(false);
    const [animateRightPanel, setAnimateRightPanel] = useState(false);

    // ⏱️ Current playback time in seconds
    const [currentTime, setCurrentTime] = useState(0);

    // ⏳ Total duration of the song in seconds
    const [duration, setDuration] = useState(0);

    // 📊 Playback progress as a percentage (0–100)
    const [progress, setProgress] = useState(0);

    // 🔈 Reference to the audio element
    const audioRef = useRef(null);

    


    // for the selection of song 
    const onselect = (song) => {
        console.log("Selected:", song);
        setCurrentSong(song);
        // You can update global state or open song details here
    };

    const toggleLike = (id) => {
        setLikedSongs((prev) => ({ ...prev, [id]: !prev[id], }));
    }

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => setSongs(data))
            .catch((err) => console.log('Lyrics Fetching error:', err))

    }, [])

    const handleTabClick = (tab) => {
        setActiveTab(tab);

        if (window.innerWidth < 640) {
            setHideLeftPanel(true);
            setAnimateRightPanel(true);
        }
    };
    // 💾 Load liked songs from localStorage on mount
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedsongs')) || {};
        setLikedSongs(storedLikes);
    }, []);

    // 💾 Save liked songs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('likedsongs', JSON.stringify(likedsongs));
    }, [likedsongs]);

    // ▶️ Handle play/pause based on isPlaying state
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
    // 🎵 Handle song end: reset playback state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setProgress(0);
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

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
    const isLiked = currentSong?.id ? likedsongs[currentSong.id] : false;


    if (!currentSong) return <div className='p-2 text-center'>No song selected yet go back and select the song first</div>;




    return (

        // h-[calc(100vh-90px)]
        <div className={`transition-transform duration-75 ease-in-out ${isPagedown ? 'translate-y-full ':' translate-y-0' }`}>
            {currentSong ? (
                <div className={`flex flex-col border border-white  lg:flex-row w-full h-full rounded-xl bg-[#1b1b1b] ` }>
                    {/* Left Panel */}
                    {!hideLeftPanel && (
                        <div className=" lg:w-1/2 gap-1 h-[calc(100vh-180px)] p-2 flex flex-col justify-evenly md:justify-center items-center ">
                            <div className=" w-[300px] border border-[#616161] md:w-[350px] rounded-xl bg-[#1b1b1b] p-2 gap-4 flex flex-col">

                                {/* Song Cover */}
                                <div className="w-full aspect-square rounded-xl relative overflow-hidden">
                                    <img className="w-full h-full object-cover rounded-xl" src={currentSong.cover} alt={currentSong.title} />
                                    <div className="absolute bottom-0 w-full hidden h-16 md:h-32 p-2 bg-black/30 rounded-b-xl md:flex flex-col sm:flex-row justify-between items-center">
                                        <div className="hidden md:inline-block text-left w-full md:w-1/2 h-6 ">
                                            <h1 className="text-sm md:text-xl font-semibold">{currentSong.title}</h1>
                                            <p className="text-xs md:text-sm">{currentSong.artist}</p>
                                        </div>
                                        <div className="w-1/2 hidden md:inline-block h-6 text-right space-y-1">
                                            <div className="flex  items-center justify-end gap-2">
                                                <img src="/public/likes.svg" alt="likesvg" />
                                                <span className="text-sm ">{currentSong.likes} likes</span>
                                            </div>
                                            <div className="md:flex justify-end hidden  ">
                                                <span className="text-sm">🎧{currentSong.monthlyListeners} <br /> monthly listeners</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="inline-block sm:hidden border w-72 h-10 truncate px-6 ">
                                <h1 className="text-sm md:text-xl font-semibold">{currentSong.title}</h1>
                                <p className="text-xs md:text-sm text-gray-400">{currentSong.artist}</p>
                            </div> */}
                            {/* seek bar  */}
                            {/* <div className="inline-block md:hidden border border-white w-[300px] flex-col items-center justify-center  md:w-full ">
                                <div className="flex items-center gap-2 w-full px-2 ">
                                    <audio
                                        ref={audioRef}
                                        src={currentSong.audioURL}
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                    />
                                    <div className="text-[10px] sm:text-xs text-gray-400 w-10  text-center">{formatTime(currentTime)}</div>
                                    <div className="flex-1 h-2 bg-gray-300 rounded cursor-pointer" onClick={handleSeek} >
                                        <div className="h-full bg-green-500 rounded min-w-2 " style={{ width: `${progress}%`, minWidth: '2px' }} />
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-400 w-10 sm:w-12 text-center">{formatTime(duration)}</div>
                                </div>
                                <div className="flex items-center justify-center gap-2  text-lg sm:text-xl">
                                    <button >⏪</button>
                                    <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
                                    <button >⏩</button>
                                </div>
                            </div> */}
                        </div>
                    )}

                    {/* bg-[#1b1b1b] */}
                    {/* Right Panel */}
                    <div className={`w-full lg:w-1/2 rounded-xl transition-all duration-900 ease-in 
                        ${animateRightPanel ? 'translate-y-[-1px] opacity-100' : 'translate-y-0 opacity-100'}`}>
                        <div className='h-full space-y-4 rounded-xl bg-[#1b1b1b] flex flex-col  gap-3 '>
                            {/* this is the code of the song selecting panel */}
                            <div className='w-full h-[calc(100vh-180px)] pb-20 bg-[#1b1b1b] rounded-lg px-4 scroll-hidden relative '>
                                {/* tabs */}
                                <div className='h-16 flex overflow-x-auto sm:justify-around border-b border-gray-800 mb-4 sticky top-0 bg-[#1b1b1b] backdrop-blur'>
                                    {['up next', 'lyrics🎶', 'related'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => handleTabClick(tab)}
                                            className={`capitalize py-2 px-4 ${activeTab === tab ? 'border-b-2 border-white font-semibold' : 'text-gray-400'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                {/* Content Area */}
                                <div className='mt-2 '>
                                    {activeTab === 'lyrics🎶' && (
                                        // <p className='text-sm leading-relaxed'> 🎶 These are the lyrics displayed here. Add your poetic magic or pull it dynamically.</p>
                                        // <Lyrics />
                                        <div>
                                            {lyrics.map((text) => (
                                                <div key={text.id} className='flex flex-col w-full sm:w-80 px-3 py-2'>
                                                    <div className='text-xl font-sans font-semibold text-gray-200'><span>{text.quote}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {activeTab === 'related' && (
                                        <ul className='space-y-1 text-sm'>
                                            <li>🔗 Related Song 1</li>
                                            <li>🔗 Related Song 2</li>
                                            <li>🔗 Related Artist</li>
                                        </ul>
                                        // <Related/>
                                    )}
                                    {activeTab === 'up next' && (
                                        // <Songs />
                                        <div className='flex flex-col gap-3'>
                                            {songs.map((song) => (
                                                <SongTile
                                                    key={song.id}
                                                    song={song}
                                                    isLiked={likedsongs[song.id]}
                                                    onLike={() => toggleLike(song.id)}
                                                    onSelect={() => onselect(song)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-white p-4">No song selected</p>
            )}
        </div>
    );
};
export default PlayerPage