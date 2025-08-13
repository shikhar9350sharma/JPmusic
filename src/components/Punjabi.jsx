import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';

const Punjabi = () => {
    const [punjabiSongs, setPunjabiSongs] = useState([]);
    const {setCurrentSong, setCurrentIndex, setPlayerSongs} = useSong();
    const navigate = useNavigate();


    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
  useEffect(() => {
    fetch('https://music-api-gamma.vercel.app/punjabi')
      .then((res) => res.json())
      .then((data) => {
        const slicedSongs = data.slice(0, 7);
        setPunjabiSongs(slicedSongs);
        setPlayerSongs(slicedSongs);
      })
      .catch((err) => console.error('Fetch error from album component:', err));
  }, []);

  const handlePunjabiClick = (gana) => {
    const index = punjabiSongs.findIndex(s => s.id === gana.id);
    setPlayerSongs(punjabiSongs);       // 👈 Set the current list
    setCurrentSong(gana);
    setCurrentIndex(index);
    setTimeout(() => navigate(`/songs/${gana.id}`), 50);
  }
  return (
    <div className="flex flex-col gap-4 py-2 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl lg:text-3xl hover:cursor-pointer hover:underline">
          Punjabi Mixture
        </h1>
      </div>

      <div className="w-full p-2 overflow-x-auto scroll-smooth scroll-hidden">
              <div className='flex gap-4'>
                  {chunkArray(punjabiSongs, 6).map((chunk, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 min-w-[900px]">
                      {chunk.map((gana) => (
                        <div key={gana.id} onClick={() => handlePunjabiClick(gana)} className="p-2 rounded hover:hover:bg-[#2b2b2b] flex gap-2">
                          <img loading='lazy' src={gana.cover} alt={gana.title} className="w-16 h-16 object-cover rounded" />
                          <div className="flex flex-col w-full max-w-[180px] truncate">
                            <h2 className="text-white font-semibold">{gana.title}</h2>
                            <span className="text-gray-400">{gana.artist}</span>
                          </div>
                        </div>

                      ))}
                      </div>
                  ))}
              </div>
      </div>
    </div>
  );
};

export default Punjabi;