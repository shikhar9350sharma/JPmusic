import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Music2,
  User,
  Calendar,
  Disc3,
  Play,
  Clock,
  Heart,
  Share2,
  ChevronLeft,
  Headphones,
  Mic2
} from 'lucide-react';
import { useSong } from '../context/SongContext';

const ArtistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artistSongs, setArtistSongs] = useState([]);
  const [artistDetails, setArtistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentIndex, setCurrentSong, setPlayerSongs, setIsPlaying } = useSong();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://music-api-gamma.vercel.app/artists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtistDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching artist:', err);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`https://music-api-gamma.vercel.app/songs?artistID=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArtistSongs(data);
          setPlayerSongs(data);
        })
        .catch((err) => console.log('Fetching songs error: ', err));
    }
  }, [id]);

  const handleArtistSongClick = (gana) => {
    const index = artistSongs.findIndex((s) => s.id === gana.id);
    setPlayerSongs(artistSongs);
    setCurrentSong(gana);
    setCurrentIndex(index);
    setIsPlaying(true);
    navigate(`/app/songs/${gana.id}`);
  };

  const handlePlayAll = () => {
    if (artistSongs.length > 0) {
      setPlayerSongs(artistSongs);
      setCurrentSong(artistSongs[0]);
      setCurrentIndex(0);
      setIsPlaying(true);
      navigate(`/app/songs/${artistSongs[0].id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Music2 className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400">Loading artist details...</p>
        </div>
      </div>
    );
  }

  if (!artistDetails) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-lg">Artist not found</p>
          <button
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 mx-auto text-emerald-500 hover:text-emerald-400 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

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

      {/* Artist Hero Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8">
        {/* Cover Image */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="w-full max-w-sm border border-[#616161] rounded-2xl bg-[#1b1b1b] p-3 shadow-2xl">
            <div className="w-full aspect-square rounded-xl relative overflow-hidden group">
              <img
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                src={artistDetails.cover}
                alt={artistDetails.title}
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={handlePlayAll}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </button>
              </div>
              {/* Verified Badge */}
              <div className="absolute top-3 right-3 bg-blue-500 rounded-full p-1.5 shadow-lg">
                <Mic2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Artist Info */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                Artist
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Headphones className="w-3 h-3" />
                {artistDetails.monthlyListeners?.toLocaleString() || '0'} monthly listeners
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {artistDetails.title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              {artistDetails.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePlayAll}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2.5 px-6 rounded-full transition-colors"
            >
              <Play className="w-4 h-4 fill-black" />
              Play All
            </button>
            <button className="flex items-center gap-2 border border-gray-600 hover:border-white text-white py-2.5 px-6 rounded-full transition-colors">
              <Heart className="w-4 h-4" />
              Follow
            </button>
            <button className="p-2.5 border border-gray-600 hover:border-white rounded-full transition-colors">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Disc3 className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-lg font-bold text-white">{artistSongs.length}</p>
                <p className="text-xs text-gray-500">Songs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-lg font-bold text-white">
                  {Math.floor(
                    artistSongs.reduce((acc, s) => acc + (parseInt(s.duration) || 0), 0) / 60
                  )}m
                </p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-lg font-bold text-white">2024</p>
                <p className="text-xs text-gray-500">Debut</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Songs Section */}
      <div className="mt-10 md:mt-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Disc3 className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Songs by {artistDetails.title}
            </h2>
          </div>
          <span className="text-sm text-gray-500">{artistSongs.length} tracks</span>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {artistSongs.map((gana, index) => (
            <div
              key={gana.id}
              onClick={() => handleArtistSongClick(gana)}
              className="group bg-[#1b1b1b] border border-gray-800 hover:border-gray-600 rounded-xl p-2.5 hover:bg-[#252525] transition-all duration-200 cursor-pointer"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                <img
                  src={gana.cover}
                  alt={gana.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                {/* Track Number */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                {gana.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <p className="text-xs text-gray-400">{gana.duration || '3:45'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;