import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSong } from '../context/SongContext';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const {setCurrentSong} = useSong();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('https://music-api-gamma.vercel.app/songs'); // Replace with your actual API or JSON path
        const data = await res.json();

          const filtered = data.filter(song =>
              (song.title?.toLowerCase().includes(query.toLowerCase())) ||
              (song.artist?.toLowerCase().includes(query.toLowerCase())) ||
              (song.album?.toLowerCase().includes(query.toLowerCase()))
          );

        setResults(filtered);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    if (query) {
      fetchSongs();
    }
  }, [query]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No matching songs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map(song => (
            <div key={song.id} onClick={()=> setCurrentSong(song)} className="bg-[#2b2b2b] p-4 rounded-lg shadow-md">
              <img src={song.cover} alt={song.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>
              <p className="text-xs text-gray-400">{song.album}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;