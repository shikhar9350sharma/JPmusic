import React from 'react'
import { useState, useEffect } from 'react'

const MusicPlayer = () => {
    const [song, setSong] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/songs/7')
            .then((res) => res.json())
            .then((data) => setSong(data))
            .catch((err) => console.log('Music player details not found', err))
    }, [])
    const onselect = (song) => {
        console.log("Selected:", song);
        // You can update global state or open song details here
    };
    if (!song) return <div className="text-white">Loading song details...</div>;
    // for click on the like button
    const [likedsongs, setLikedSongs] = useState({})
    const toggleLike = (id) => {
        setLikedSongs((prev) => ({ ...prev, [id]: !prev[id], }));
    }
    const onLike = () => {
        toggleLike(song.id)
        console.log('song click id', song.id)
    }

    const isLiked = likedsongs[song.id]
    // for local storage of the liked songs 
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
        setLikedSongs(storedLikes);
    }, []);

    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedsongs));
    }, [likedsongs]);

    const [isPauseButton, setIsPauseButton] = useState(false);
    const togglePauseButton = () => setIsPauseButton(!isPauseButton);

    const [isVolumeMute, setIsVolumeMute] = useState(false);
    const toggleVolume = () => setIsVolumeMute(!isVolumeMute);

    return (
        <>
            <div className='fixed bottom-0 z-50 grid grid-cols-3 items-center w-full h-20  bg-[#0d0d0e]'>
                {/* for showing the song details  */}
                <div
                    key={song.id}
                    className="flex items-center justify-between gap-4 h-full p-3 hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
                    onClick={onselect}
                >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center flex-col sm:flex-row sm:justify-between sm:items-center space-x-4">
                        <img
                            src={song.cover}
                            alt={song.title}
                            className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                            <h3 className="text-sm font-semibold text-white">{song.title}</h3>
                            <p className="text-xs text-gray-400">{song.artist}</p>
                        </div>
                    </div>
                    {/* Right: Duration & Like */}
                    <div className="flex items-center space-x-4">
                        {/* <span className="text-xs text-gray-300">{song.duration}</span> */}
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
                {/* for showing the seekbar and buttons like play, previous, next  */}
                <div className=' h-full flex flex-col items-center p-2'>
                    {/* buttons */}
                    <div className='flex items-center justify-center gap-4 pt-1'>
                        {/* previous svg */}
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                    <path d="M8.06492 12.6258C8.31931 13.8374 9.67295 14.7077 12.3802 16.4481C15.3247 18.3411 16.797 19.2876 17.9895 18.9229C18.3934 18.7994 18.7654 18.5823 19.0777 18.2876C20 17.4178 20 15.6118 20 12C20 8.38816 20 6.58224 19.0777 5.71235C18.7654 5.41773 18.3934 5.20057 17.9895 5.07707C16.797 4.71243 15.3247 5.6589 12.3802 7.55186C9.67295 9.29233 8.31931 10.1626 8.06492 11.3742C7.97836 11.7865 7.97836 12.2135 8.06492 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                                    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                </svg>
                            </button>
                        </div>
                        {/* for pause svg */}
                        <div>
                            <button onClick={togglePauseButton}>
                                {isPauseButton ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                        <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                        <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                                    </svg>
                                }
                            </button>
                        </div>
                        {/* next svg  */}
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                    <path d="M15.9351 12.6258C15.6807 13.8374 14.327 14.7077 11.6198 16.4481C8.67528 18.3411 7.20303 19.2876 6.01052 18.9229C5.60662 18.7994 5.23463 18.5823 4.92227 18.2876C4 17.4178 4 15.6118 4 12C4 8.38816 4 6.58224 4.92227 5.71235C5.23463 5.41773 5.60662 5.20057 6.01052 5.07707C7.20304 4.71243 8.67528 5.6589 11.6198 7.55186C14.327 9.29233 15.6807 10.1626 15.9351 11.3742C16.0216 11.7865 16.0216 12.2135 15.9351 12.6258Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                                    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* seekbar  */}
                    <div className='flex items-center  gap-2'>
                        <div>00:00</div>
                        <div className='h-1 border border-white w-80 hover:cursor-pointer bg-black relative '>
                            <div className=' absolute bottom-[-4px] p-1 rounded-full  bg-white border border-white'></div>
                        </div>
                        <div>{song.duration}</div>
                    </div>
                </div>
                {/* for showing the audio mute or volume balance button details  */}
                <div className=' flex h-full items-center justify-end gap-4 pr-4'>
                    <div>
                        <button onClick={toggleVolume} className='mt-1'>
                            {isVolumeMute ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                    <path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M18 10L22 14M18 14L22 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="white">
                                    <path d="M19 9C19.6254 9.81968 20 10.8634 20 12C20 13.1366 19.6254 14.1803 19 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M16 14.8135V9.18646C16 6.04126 16 4.46866 15.0747 4.0773C14.1494 3.68593 13.0604 4.79793 10.8823 7.02192C9.7544 8.17365 9.11086 8.42869 7.50605 8.42869C6.10259 8.42869 5.40086 8.42869 4.89677 8.77262C3.85036 9.48655 4.00854 10.882 4.00854 12C4.00854 13.118 3.85036 14.5134 4.89677 15.2274C5.40086 15.5713 6.10259 15.5713 7.50605 15.5713C9.11086 15.5713 9.7544 15.8264 10.8823 16.9781C13.0604 19.2021 14.1494 20.3141 15.0747 19.9227C16 19.5313 16 17.9587 16 14.8135Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            }
                        </button>
                    </div>
                    {/* for volume control */}
                    <div className='h-1 border border-white w-16 hover:cursor-pointer bg-black relative '>
                        <div className=' absolute p-1 bottom-[-4px] rounded-full  bg-white border border-white'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MusicPlayer
