import React, { useEffect, useRef, useState } from 'react';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const audioRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/songs')
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  const handlePlay = (id) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      // Pause any other audio
      Object.keys(audioRefs.current).forEach((key) => {
        if (parseInt(key) !== id) {
          audioRefs.current[key]?.pause();
          audioRefs.current[key].currentTime = 0;
        }
      });

      setPlayingId(id);

      setTimeout(() => {
        audioRefs.current[id]?.play().catch((e) => {
          console.error(`Audio failed to play for song ${id}`, e);
        });
      }, 100); // slight delay to allow React to render
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => handlePlay(song.id)}
          className="bg-white rounded-2xl shadow-lg p-4 transition hover:shadow-2xl cursor-pointer"
        >
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold mb-1">{song.title}</h2>
          <p className="text-gray-600 mb-2">{song.artist}</p>
          <p className="text-sm text-gray-500">Duration: {song.duration}</p>
          <p className="text-sm text-gray-500">Likes: {song.likes.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mb-2">Monthly Listeners: {song.monthlyListeners.toLocaleString()}</p>

          {song.audioURL ? (
            <audio
              ref={(el) => (audioRefs.current[song.id] = el)}
              src={song.audioURL}
              className="w-full mt-2"
              preload="none"
              controls
            />
          ) : (
            <p className="text-red-500">No audio available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongList;
