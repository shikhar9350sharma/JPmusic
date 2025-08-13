import React, { useEffect, useState } from 'react';
import SongCards from './SongCards';

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('https://music-api-gamma.vercel.app/songs')
            .then((res) => res.json())
            .then((data) => setSongs(data.slice(0, 13)))
            .catch((err) => console.log('Fetching song cover error: ', err));
    }, []);

    return (
        <div className="flex flex-wrap items-center gap-8 p-6 border">
            {songs.map((song) => (
                <SongCards key={song.id} song={song} />
            ))}
        </div>
    );
};

export default SongList;