import { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';

const SongContext = createContext();
export const useSong = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artistDetails, setArtistDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerSongs, setPlayerSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState({});

  // Shared audio element (persistent across pages)
  const audioRef = useRef(new Audio());
  
  // Mini player visibility state
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  // Use refs to avoid stale closures in callbacks
  const playerSongsRef = useRef(playerSongs);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    playerSongsRef.current = playerSongs;
  }, [playerSongs]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Restore liked songs from localStorage
  useEffect(() => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
      setLikedSongs(storedLikes);
    } catch (err) {
      console.error('Failed to parse likedSongs:', err);
      setLikedSongs({});
    }
  }, []);

  // Persist liked songs
  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  // Restore playerSongs from localStorage
  useEffect(() => {
    try {
      const storedSongs = JSON.parse(localStorage.getItem('playerSongs')) || [];
      if (Array.isArray(storedSongs) && storedSongs.length > 0) {
        setPlayerSongs(storedSongs);
      }
    } catch (err) {
      console.error('Failed to parse playerSongs:', err);
    }
  }, []);

  // Persist playerSongs
  useEffect(() => {
    localStorage.setItem('playerSongs', JSON.stringify(playerSongs));
  }, [playerSongs]);

  // Restore currentSong from localStorage
  useEffect(() => {
    try {
      const storedSong = JSON.parse(localStorage.getItem('currentSong'));
      if (storedSong) setCurrentSong(storedSong);
    } catch (err) {
      console.error('Failed to parse currentSong:', err);
    }
  }, []);

  // Persist currentSong
  useEffect(() => {
    localStorage.setItem('currentSong', JSON.stringify(currentSong));
  }, [currentSong]);

  // Also restore playback state on mount
  useEffect(() => {
    const storedPlaying = localStorage.getItem('isPlaying');
    if (storedPlaying === 'true' && currentSong?.audioURL) {
      audioRef.current.src = currentSong.audioURL;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      setShowMiniPlayer(true);
    }
  }, []);

  // Persist isPlaying state
  useEffect(() => {
    localStorage.setItem('isPlaying', isPlaying);
  }, [isPlaying]);

  // Stable callback - uses refs to avoid dependency array issues
  const setCurrentSongByIndex = useCallback((index) => {
    const songs = playerSongsRef.current;
    if (index >= 0 && index < songs.length) {
      setCurrentIndex(index);
      setCurrentSong(songs[index]);
    }
  }, []);

  // ✅ Central play function - use this everywhere to start playback
  const playSong = useCallback((song, playlist = [], index = 0) => {
    setCurrentSong(song);
    setPlayerSongs(playlist);
    setCurrentIndex(index);
    setIsPlaying(true);
    setShowMiniPlayer(true);

    if (audioRef.current && song.audioURL) {
      if (audioRef.current.src !== song.audioURL) {
        audioRef.current.src = song.audioURL;
      }
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, []);

  // ✅ Toggle play/pause using shared audio
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  // ✅ Skip to specific song in playlist
  const skipToSong = useCallback((index) => {
    const songs = playerSongsRef.current;
    if (index >= 0 && index < songs.length) {
      const song = songs[index];
      setCurrentIndex(index);
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current && song.audioURL) {
        audioRef.current.src = song.audioURL;
        audioRef.current.play().catch(console.error);
      }
    }
  }, []);

  // playNextSong now updates audio source
  const playNextSong = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1;
    const songs = playerSongsRef.current;

    if (nextIndex < songs.length) {
      const nextSong = songs[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentSong(nextSong);
      setIsPlaying(true);
      setShowMiniPlayer(true);
      
      // Update audio source and play
      if (audioRef.current && nextSong.audioURL) {
        audioRef.current.src = nextSong.audioURL;
        audioRef.current.play().catch(console.error);
      }
    } else {
      console.log('End of playlist');
      setIsPlaying(false);
    }
  }, []);

  // playPreviousSong now updates audio source
  const playPreviousSong = useCallback(() => {
    const prevIndex = currentIndexRef.current - 1;
    const songs = playerSongsRef.current;
    
    if (prevIndex >= 0) {
      const prevSong = songs[prevIndex];
      setCurrentIndex(prevIndex);
      setCurrentSong(prevSong);
      setIsPlaying(true);
      setShowMiniPlayer(true);
      
      //  Update audio source and play
      if (audioRef.current && prevSong.audioURL) {
        audioRef.current.src = prevSong.audioURL;
        audioRef.current.play().catch(console.error);
      }
    }
  }, []);

  // Stable toggleLike
  const toggleLike = useCallback((id) => {
    setLikedSongs((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = {
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    artistDetails,
    setArtistDetails,
    currentIndex,
    setCurrentIndex,
    playPreviousSong,
    playNextSong,
    playerSongs,
    setPlayerSongs,
    likedSongs,
    setLikedSongs,
    toggleLike,
    audioRef,
    showMiniPlayer,
    setShowMiniPlayer,
    playSong,
    togglePlay,
    skipToSong,
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
};