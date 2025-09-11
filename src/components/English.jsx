import { useRef, useState, useEffect } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";

const NewRlease = () => {
    const scrollRef = useRef(null);
    const [englishSongs, setEnglishSongs] = useState([]);
    const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/english')
            .then((res) => res.json())
            .then((data) => {
                const slicedSongs = data.slice(0, 6);
                setEnglishSongs(slicedSongs);     // Local state for rendering
            })
            .catch((err) => console.log('Fetching song cover error: ', err));
    }, []);

    // handle click on songs in the list of listen again 
    const handleEnglishClick = (gana) => {
        const index = englishSongs.findIndex(s => s.id === gana.id);
        setPlayerSongs(englishSongs); 
        setCurrentSong(gana);
        setCurrentIndex(index); // 🔥 This enables next/previous navigation
        navigate(`/app/songs/${gana.id}`);
    };
   
    return (
        <div className="w-full py-2 px-4  relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline">
                    English Beats
                </h1>
            </div>

            {/* Scrollable Songs */}
            <div ref={scrollRef} className="w-full  scroll-hidden">
                <div className="flex gap-4 px-2 sm:px-4">
                    {englishSongs.map((gana)=>(
                    <div key={gana.id} className="w-24 sm:w-28 md:w-32 lg:w-40 flex-shrink-0 flex flex-col hover:cursor-pointer">
                        <div onClick={()=>handleEnglishClick(gana)} className="w-full h-28 md:h-32 lg:h-44 p-2 rounded-xl hover:scale-105 transition-transform duration-300">
                            <img
                                loading="lazy"
                                className="w-full h-full object-contain rounded-xl "
                                src={gana.cover}
                                alt={gana.title}
                            />
                        </div>
                        <div className="text-sm lg:text-lg font-semibold flex flex-col min-w-0">
                            <h2 className="truncate">{gana.title}</h2>
                            <span className="truncate text-gray-400">{gana.artist}</span>
                        </div>
                    </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewRlease;