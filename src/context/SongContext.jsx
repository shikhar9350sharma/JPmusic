

import React, { createContext, useState,useEffect, useContext } from 'react';

const SongContext = createContext();
export const useSong = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]); // ✅ Add this line
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artistDetails, setArtistDetails] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerSongs, setPlayerSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState({});


  const setCurrentSongByIndex = (index) => {
    if (index >= 0 && index < playerSongs.length) {
      setCurrentIndex(index);
      setCurrentSong(playerSongs[index]);
    }
  };

  const playNextSong = () => {
    if (currentIndex + 1 < playerSongs.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(playerSongs[nextIndex]);
      setIsPlaying(true); // ✅ Ensure playback resumes
    } else {
      console.log("End of playlist");
      setIsPlaying(false);
    }
  };

  const playPreviousSong = () => {
    if (currentIndex > 0) {
      setCurrentSongByIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

 

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedSongs')) || {};
    setLikedSongs(storedLikes);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (id) => {
    setLikedSongs((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <SongContext.Provider
      value={{
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
        toggleLike
      }}
    >
      {children}
    </SongContext.Provider>
  );
};