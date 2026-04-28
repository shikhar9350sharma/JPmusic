import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heart,
  Headphones,
  Music2,
  ListMusic,
  Mic2,
  Link2,
  Play,
  Pause
} from 'lucide-react';
import { useSong } from '../context/SongContext';
import SongTile from './SongTile';

const PlayerPage = () => {
  const {
    currentSong,
    setCurrentSong,
    playerSongs,
    setPlayerSongs,
    setCurrentIndex,
    currentIndex,
    likedSongs,
    toggleLike,
    setIsPlaying,
    isPlaying
  } = useSong();

  const [activeTab, setActiveTab] = useState('up next');
  const { id } = useParams();

  useEffect(() => {
    if (!currentSong && id) {
      fetch('https://music-api-gamma.vercel.app/songs')
        .then((res) => res.json())
        .then((data) => {
          const song = data.find((s) => s.id === id);
          if (song) {
            setCurrentSong(song);
            const related = data.filter((s) => s.artistID === song.artistID);
            setPlayerSongs(related);
            const index = related.findIndex((s) => s.id === song.id);
            if (index !== -1) setCurrentIndex(index);
          }
        })
        .catch((err) => console.error('Failed to fetch song by ID:', err));
    }
  }, [id, currentSong]);

  useEffect(() => {
    if (!playerSongs.length && currentSong?.artistID) {
      fetch('https://music-api-gamma.vercel.app/songs')
        .then((res) => res.json())
        .then((data) => {
          const related = data.filter(
            (song) => song.artistID === currentSong.artistID
          );
          setPlayerSongs(related);
          const index = related.findIndex((s) => s.id === currentSong.id);
          if (index !== -1) setCurrentIndex(index);
        })
        .catch((err) => console.error('Failed to fetch fallback songs:', err));
    }
  }, [playerSongs.length, currentSong]);

  const tabs = [
    { id: 'up next', label: 'Up Next', icon: ListMusic },
    { id: 'lyrics', label: 'Lyrics', icon: Mic2 },
    { id: 'related', label: 'Related', icon: Link2 }
  ];

  if (!currentSong) {
    return (
      <div className="h-[calc(100vh-180px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Music2 className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-gray-400 text-lg">No song selected</p>
          <button
            onClick={() => window.history.back()}
            className="text-emerald-500 hover:text-emerald-400 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)]">
      <div className="flex flex-col lg:flex-row w-full h-full rounded-xl bg-[#1b1b1b] overflow-hidden">
        {/* Left Panel - Song Info */}
        <div className="lg:w-1/2 p-4 md:p-6 flex flex-col justify-center items-center border-transparent lg:border-r border-[#464646] gap-6">
          {/* Cover Card */}
          <div className="w-full max-w-[320px] md:max-w-[380px] border border-[#616161] rounded-2xl bg-[#1b1b1b] p-3 shadow-2xl">
            <div className="w-full aspect-square rounded-xl relative overflow-hidden group">
              <img
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                src={currentSong.cover}
                alt={currentSong.title}
              />
              {/* Overlay with song info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-white">{currentSong.title}</h1>
                    <p className="text-sm text-gray-300">{currentSong.artist}</p>
                  </div>
                  <button
                    onClick={() => toggleLike(currentSong.id)}
                    className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-colors ${
                      likedSongs[currentSong.id]
                        ? 'text-emerald-500'
                        : 'text-white hover:text-emerald-400'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedSongs[currentSong.id] ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Song Info */}
          <div className="lg:hidden w-full max-w-[320px] text-center space-y-2">
            <h1 className="text-lg font-bold text-white truncate">
              {currentSong.title}
            </h1>
            <p className="text-sm text-gray-400">{currentSong.artist}</p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Heart className="w-3.5 h-3.5" />
                <span>{currentSong.likes?.toLocaleString() || 0} likes</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Headphones className="w-3.5 h-3.5" />
                <span>
                  {currentSong.monthlyListeners?.toLocaleString() || 0}{' '}
                  monthly
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden lg:flex w-full max-w-[380px] items-center justify-between px-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Heart
                className={`w-5 h-5 ${
                  likedSongs[currentSong.id]
                    ? 'text-emerald-500 fill-emerald-500'
                    : ''
                }`}
              />
              <span className="text-sm">
                {currentSong.likes?.toLocaleString() || 0} likes
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Headphones className="w-5 h-5" />
              <span className="text-sm">
                {currentSong.monthlyListeners?.toLocaleString() || 0} monthly
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel - Tabs & Queue */}
        <div className="w-full lg:w-1/2 flex flex-col h-full">
          <div className="h-full flex flex-col gap-3 bg-[#1b1b1b]">
            <div className="h-full pb-20 overflow-hidden">
              {/* Tabs */}
              <div className="h-14 flex items-center justify-center gap-1 md:gap-2 border-b border-gray-800 sticky top-0 bg-[#1b1b1b] z-10 px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="mt-2 px-4 h-[calc(100%-3.5rem)] overflow-y-auto scroll-hidden">
                {activeTab === 'lyrics' && (
                  <div className="py-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mic2 className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-white">Lyrics</h3>
                    </div>
                    <div className="bg-[#252525] rounded-xl p-6">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base md:text-lg">
                        {currentSong.lyrics || (
                          <span className="text-gray-500 italic">
                            No lyrics available for this song.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'related' && (
                  <div className="py-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Link2 className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-white">
                        Related
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {['Related Song 1', 'Related Song 2', 'Related Artist'].map(
                        (item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg bg-[#252525] hover:bg-[#2f2f2f] transition-colors cursor-pointer"
                          >
                            <Link2 className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === 'up next' && (
                  <div className="flex flex-col gap-1 py-2 pb-24">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <ListMusic className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-white">
                        Up Next
                      </h3>
                      <span className="text-xs text-gray-500 ml-auto">
                        {playerSongs.length} songs
                      </span>
                    </div>
                    {playerSongs.map((song, i) => (
                      <SongTile
                        key={song.id}
                        song={song}
                        isActive={i === currentIndex}
                        isLiked={likedSongs[song.id] ?? false}
                        onLike={() => toggleLike(song.id)}
                        onSelect={() => {
                          setCurrentSong(song);
                          setCurrentIndex(i);
                          setIsPlaying(true);
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
    </div>
  );
};

export default PlayerPage;