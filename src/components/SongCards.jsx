import { useSong } from '../context/SongContext';
import { useNavigate } from 'react-router-dom';


const SongCards = ({ song }) => {
    const { setCurrentSong } = useSong();
    const navigate = useNavigate();
    const handlePlay = () => {
        setCurrentSong(song);
        navigate(`/songs/${song.id}`);
    };

    return (
        <>
            <div onClick={handlePlay}  className="flex flex-col gap-2  cursor-pointer h-80 w-80  my-4 items-center justify-center">
                <div className=' hover:scale-105 transition-transform duration-100 '><img className='rounded-xl object-cover' loading='lazy' src={song.cover} alt="cover" /></div>
                <div><h3>{song.title}</h3></div>
            </div>
        </>
    );
};
export default SongCards