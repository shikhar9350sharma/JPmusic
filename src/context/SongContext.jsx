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

  // Stable callback - uses refs to avoid dependency array issues
  const setCurrentSongByIndex = useCallback((index) => {
    const songs = playerSongsRef.current;
    if (index >= 0 && index < songs.length) {
      setCurrentIndex(index);
      setCurrentSong(songs[index]);
    }
  }, []); // Empty deps - uses ref

  // Stable playNextSong
  const playNextSong = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1;
    const songs = playerSongsRef.current;

    if (nextIndex < songs.length) {
      setCurrentIndex(nextIndex);
      setCurrentSong(songs[nextIndex]);
      setIsPlaying(true);
    } else {
      console.log('End of playlist');
      setIsPlaying(false);
    }
  }, []); // Empty deps - uses refs

  // Stable playPreviousSong
  const playPreviousSong = useCallback(() => {
    const prevIndex = currentIndexRef.current - 1;
    
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentSong(playerSongsRef.current[prevIndex]);
      setIsPlaying(true);
    }
  }, []); // Empty deps - uses refs

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
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
};