import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Library,
  Disc3,
  Play,
  Clock,
  Music2,
  ChevronLeft,
  ListMusic,
  Heart
} from 'lucide-react';
import { useSong } from '../context/SongContext';

const LibraryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albumSongs, setAlbumSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`https://music-api-gamma.vercel.app/songs?albumID=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAlbumSongs(data);
          setPlayerSongs(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log('Fetching songs in LibraryPage error: ', err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleAlbumClick = (gana) => {
    const index = albumSongs.findIndex((s) => s.id === gana.id);
    setPlayerSongs(albumSongs);
    setCurrentSong(gana);
    setCurrentIndex(index);
    setIsPlaying(true);
    navigate(`/app/songs/${gana.id}`);
  };

  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      setPlayerSongs(albumSongs);
      setCurrentSong(albumSongs[0]);
      setCurrentIndex(0);
      setIsPlaying(true);
      navigate(`/app/songs/${albumSongs[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Library className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400">Loading album...</p>
        </div>
      </div>
    );
  }

  if (albumSongs.length === 0) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Music2 className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-lg">No songs found in this album</p>
          <button
            onClick={() => navigate('/app/library')}
            className="flex items-center gap-2 mx-auto text-emerald-500 hover:text-emerald-400 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  // Get album info from first song
  const albumInfo = albumSongs[0];

  return (
    <div className="p-4 md:p-6 pb-32">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 md:hidden"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      {/* Album Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 md:gap-6 mb-8">
        {/* Album Cover */}
        <div className="w-full sm:w-48 md:w-56 flex-shrink-0">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group">
            <img
              src={albumInfo.cover}
              alt={albumInfo.album || 'Album'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={handlePlayAll}
                className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              >
                <Play className="w-7 h-7 text-white fill-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Album Info */}
        <div className="flex-1 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
            <Disc3 className="w-3 h-3" />
            Album
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {albumInfo.album || 'Unknown Album'}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <ListMusic className="w-4 h-4" />
              {albumSongs.length} songs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.floor(
                albumSongs.reduce((acc, s) => acc + (parseInt(s.duration) || 180), 0) / 60
              )} min
            </span>
          </div>
          <p className="text-sm text-gray-500">{albumInfo.artist}</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={handlePlayAll}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 px-6 rounded-full transition-colors text-sm"
            >
              <Play className="w-4 h-4 fill-black" />
              Play All
            </button>
            <button className="p-2 border border-gray-600 hover:border-white rounded-full transition-colors">
              <Heart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-1">
        {albumSongs.map((gana, index) => (
          <div
            key={gana.id}
            onClick={() => handleAlbumClick(gana)}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-[#2b2b2b] transition-colors cursor-pointer"
          >
            {/* Track Number / Play Icon */}
            <div className="w-8 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-gray-500 group-hover:hidden">
                {index + 1}
              </span>
              <Play className="w-4 h-4 text-white hidden group-hover:block fill-white" />
            </div>

            {/* Song Cover */}
            <img
              src={gana.cover}
              alt={gana.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                {gana.title}
              </h3>
              <p className="text-xs text-gray-400 truncate">{gana.artist}</p>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{gana.duration || '3:45'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;