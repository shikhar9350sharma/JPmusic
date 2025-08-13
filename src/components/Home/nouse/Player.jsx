import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Player = () => {
  const { id } = useParams();                // Grab song ID from URL
  const [song, setSong] = useState(null);    // Store song data

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await fetch(`http://localhost:3001/songs/${id}`);
        const data = await res.json();
        setSong(data);
        // console.log('Fetched song:', data);

      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };
    fetchSong();
  }, [id]);

  if (!song) return <div className="text-white">Loading song details...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
      <p className="mb-4">By {song.artist}</p>

      <audio controls>
        <source src={song.audioURL} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;