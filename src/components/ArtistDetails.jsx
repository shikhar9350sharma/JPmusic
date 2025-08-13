import { useRef, useState, useEffect } from "react";
import { useSong } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { id } = useParams();
  const [ArtistSongs, setArtistSongs] = useState([]);
  const { setCurrentIndex, setCurrentSong, setPlayerSongs } = useSong();
  const navigate = useNavigate();
  const [artistDetails, setArtistDetails] = useState(null);

  useEffect(() => {
    fetch(`https://music-api-gamma.vercel.app/artists/${id}`)
      .then(res => res.json())
      .then(data => setArtistDetails(data));
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://music-api-gamma.vercel.app/songs?artistID=${id}`)
        .then(res => res.json())
        // .then(data => setSongs(data));
        .then((data) => {
          const slicedSongs = data;
          setArtistSongs(slicedSongs);     // Local state for rendering
          setPlayerSongs(slicedSongs);                // 🔥 Update context for navigation
        })
        .catch((err) => console.log('Fetching song cover error: ', err));
    }
  }, [id]);
  const handleArtistSongClick = (gana) => {
    const index = ArtistSongs.findIndex(s => s.id === gana.id);
    setPlayerSongs(ArtistSongs);
    setCurrentSong(gana);
    setCurrentIndex(index); // 🔥 This enables next/previous navigation
    setTimeout(() => navigate(`/songs/${gana.id}`), 50);
  };

  if (!artistDetails) {
    return <div className="p-4 text-center text-gray-400">Loading artist details...</div>;
  }

  return (
    <div className="p-4 pb-24">
      {/* Artist Info Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Cover Section */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="w-full max-w-md border border-[#616161] rounded-xl bg-[#1b1b1b] p-2">
            <div className="w-full aspect-square rounded-xl relative overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={artistDetails.cover}
                alt={artistDetails.title}
              />
              <div className="absolute bottom-0 w-full h-24 p-2 bg-black/40 rounded-b-xl flex flex-col justify-center">
                <h1 className="text-base sm:text-lg font-semibold text-white">{artistDetails.title}</h1>
                <p className="text-sm text-gray-300">{artistDetails.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-start space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">Details of Artist</h1>
          <p><strong>Name:</strong> {artistDetails.title}</p>
          <p><strong>Bio:</strong> {artistDetails.bio}</p>
        </div>
      </div>

      {/* Songs Section */}
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Songs by {artistDetails.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ArtistSongs.map(gana => (
            <div key={gana.id} onClick={()=> handleArtistSongClick(gana)} className="bg-[#1b1b1b] border border-gray-700 rounded-lg p-2">
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
  );
};

export default ArtistDetails;