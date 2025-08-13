import { useSong } from '../context/SongContext';
import { useState } from 'react';
import SongTile from './SongTile';

const PlayerPage = () => {
    const { currentSong, setCurrentSong, playerSongs, setCurrentIndex, currentIndex, likedSongs, toggleLike} = useSong();
    const [activeTab, setActiveTab] = useState('up next')
    
    const onselect = (song) => {
        setCurrentSong(song);
    };

    return (
        // h-[calc(100vh-90px)]
        <div className=" h-[calc(100vh-180px)] ">
            {currentSong ? (
                <div className="flex flex-col lg:flex-row w-full h-full rounded-xl bg-[#1b1b1b]">
                    {/* Left Panel */}
                    <div className="lg:w-1/2 p-2 flex flex-col justify-evenly md:justify-center items-center border-transparent border-r md:border-[#464646]">
                        <div className=" w-[300px] border border-[#616161] md:w-[350px] rounded-xl bg-[#1b1b1b] p-2 gap-4 flex flex-col"> 
                            {/* Song Cover */}
                            <div className="w-full aspect-square rounded-xl relative overflow-hidden">
                                <img className="w-full h-full object-cover rounded-xl" src={currentSong.cover} alt={currentSong.title} />
                                <div className="hidden absolute bottom-0 w-full h-32 p-2 bg-black/30 rounded-b-xl md:flex flex-col sm:flex-row justify-between items-center">
                                    <div className="text-left w-1/2 h-6 ">
                                        <h1 className="text-lg font-semibold">{currentSong.title}</h1>
                                        <p className="text-sm">{currentSong.artist}</p>
                                    </div>
                                    <div className="w-1/2 h-6 text-right space-y-1">
                                        <div className="flex  items-center justify-end gap-2">
                                            <img src="/Likes.svg" alt="likesvg" />
                                            <span className="text-sm">{currentSong.likes} likes</span>
                                        </div>
                                        <div className="flex justify-end ">
                                            <span className="text-sm">🎧{currentSong.monthlyListeners} <br/> monthly listeners</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:hidden w-72 mt-5 h-14 flex flex-col items-center gap-1 p-1 truncate  ">
                            <h1 className="text-sm md:text-xl font-semibold">{currentSong.title}</h1>
                            <p className="text-xs md:text-sm text-gray-400">{currentSong.artist}</p>
                        </div>
                    </div>
                    {/* bg-[#1b1b1b] */}
                    {/* Right Panel */}
                    <div className="w-full lg:w-1/2 rounded-xl ">
                        <div className='h-full space-y-4 rounded-xl bg-[#1b1b1b] flex flex-col  gap-3 '>
                            {/* this is the code of the song selecting panel */}
                            <div className='w-full h-[calc(100vh-180px)] pb-20 bg-[#1b1b1b] rounded-lg px-4 scroll-hidden relative '>
                                {/* tabs */}
                                <div className='h-16 flex overflow-x-auto justify-center gap-3 md:gap-0 md:justify-around border-b border-gray-800 mb-4 sticky top-0 bg-[#1b1b1b] backdrop-blur'>
                                    {['up next', 'lyrics🎶', 'related'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`capitalize py-2 px-4 ${activeTab === tab ? 'border-b-2 border-white font-semibold' : 'text-gray-400'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                {/* Content Area */}
                                <div className='mt-2 '>
                                    {activeTab === 'lyrics🎶' && (
                                        <div>
                                            <div  className='flex flex-col w-full sm:w-80 px-3 py-2'>
                                                <div className='text-xl font-sans font-semibold text-gray-200'><span>{currentSong.lyrics}</span></div>
                                            </div>
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
                                        <div className='flex flex-col gap-3 pb-20'>
                                            {playerSongs.map((song, i) => (
                                                <SongTile
                                                    key={song.id}
                                                    song={song}
                                                    isActive={i === currentIndex}
                                                    onSelect={() => onselect(song)}
                                                    isLiked={likedSongs[song.id] ?? false}
                                                    onLike={() => toggleLike(song.id)}
                                                    onClick={() => {
                                                        setCurrentSong(song);
                                                        setCurrentIndex(i);
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
            ) : (
                <p className="text-white p-4">No song selected, back to homepage</p>
            )}
        </div>
    );
};
export default PlayerPage