import React from 'react'
import SongTile from "./SongTile";
import { useState, useEffect } from 'react'
const SongCard = () => {
    const [activeTab, setActiveTab] = useState('Up Next')
    const [lyrics, setLyrics] = useState([])
    // lyrics fetching 
    useEffect(() => {
        fetch("https://dummyjson.com/quotes")
            .then((res) => res.json())
            .then((data) => setLyrics(data.quotes.slice(0, 6)))
            .catch((err) => console.log('Lyrics Fetching error:', err))
    }, [])

    // for the selection of song 
    const onselect = (song) => {
        console.log("Selected:", song);
        // You can update global state or open song details here
    };
    if (!songs) return <div className="text-white">Loading song details...</div>;

    // for click on the like button
    const [likedsongs, setLikedSongs] = useState({}) 
    const toggleLike = (id) => {
        setLikedSongs((prev) => ({ ...prev, [id]: !prev[id], }));
    }

    const [songs, setSongs] = useState([])
        useEffect(() => {
        fetch('http://localhost:3001/songs')
            .then((res) => res.json())
            .then((data) => setSongs((data)))
            .catch((err) => console.log('Fetching song cover error: ', err))
    }, [])
    // for local storage of the liked songs 
    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
        setLikedSongs(storedLikes);
    }, []);

    useEffect(() => {
        localStorage.setItem('likedSongs', JSON.stringify(likedsongs));
    }, [likedsongs]);
    

    return (
        <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto min-h-[500px] md:h-screen p-1 rounded-xl'>
            <div className='h-full space-y-4 rounded-xl bg-[#1b1b1b] flex flex-col  gap-3 p-4'>
                {/* this is the code of search box */}
                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-3 bg-[#3b3b3b] border border-transparent rounded-full px-4 py-2 hover:border-gray-200 transition-all duration-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-shrink-0"
                        >
                            <path d="M17 17L21 21" />
                            <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" />
                        </svg>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search by artists, songs, or albums"
                            className="w-full sm:min-w-[260px] max-w-4xl bg-transparent outline-none text-white text-sm placeholder-gray-300"
                        />
                    </div>
                    <div className="relative flex items-center">
                        <div className="z-10 text-center border-2 border-black p-2 rounded-full bg-[#3b3b3b] ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" />
                                <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
                            </svg>
                        </div>
                        <div className=" absolute right-8 text-center p-2 rounded-full bg-[#3b3b3b]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 9V20" />
                                <path d="M8 4V20" />
                                <path d="M12 11V20" />
                                <path d="M16 7V20" />
                                <path d="M20 14V20" />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* this is the code of the song selecting panel */}
                <div className='w-full h-screen bg-[#1b1b1b] rounded-lg px-4 scroll-hidden relative '>
                    {/* tabs */}
                    <div className='h-16 flex overflow-x-auto sm:justify-around border-b border-gray-800 mb-4 sticky top-0 bg-[#1b1b1b] backdrop-blur'>
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
    )
}

export default SongCard
