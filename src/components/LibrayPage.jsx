import { useState, useEffect } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


const LibrayPage = () => {
    const { id } = useParams();
  const [AlbumSongs, setAlbumSongs] = useState([]);
  const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://music-api-gamma.vercel.app/songs?albumID=${id}`) 
        .then(res => res.json())
        .then((data) => {
          const slicedSongs = data;
          setAlbumSongs(slicedSongs);     // Local state for rendering
          setPlayerSongs(slicedSongs);  // 🔥 Update context for navigation
        })
        .catch((err) => console.log('Fetching song cover in LibrayPage error: ', err));
    }
  }, [id]);
  const handleAlbumClick = (gana) => {
    const index = AlbumSongs.findIndex(s => s.id === gana.id);
    setPlayerSongs(AlbumSongs);
    setCurrentSong(gana);
    setCurrentIndex(index); // 🔥 This enables next/previous navigation
    setTimeout(() => navigate(`/app/songs/${gana.id}`), 50);
  };

  if (!AlbumSongs) {
    return <div className="p-4 text-center text-gray-400">Go to HomePage</div>;
  }

  return (
    <div>
      <div className=" p-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {AlbumSongs.map(gana => (
            <div key={gana.id} onClick={()=> handleAlbumClick(gana)} className="bg-[#1b1b1b] border border-gray-700 rounded-lg p-2">
              <img
                src={gana.cover}
                alt={gana.title}
                className="w-full h-28 object-cover rounded-md mb-2"
              />
              <h3 className="text-sm font-semibold">{gana.title}</h3>
              <p className="text-xs text-gray-400">{gana.artist} • {gana.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LibrayPage
