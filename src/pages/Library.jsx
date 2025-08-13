import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Library = () => {
  const navigate = useNavigate();
  const [Album, setAlbum] = useState([]);


  useEffect(() => {
    fetch('https://music-api-gamma.vercel.app/albums')
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, [])

  const handleLibraryClick = (album)=>{
    navigate(`/librarypage/${album.id}`);
  }
  return (
    
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 mb-20 w-full'>
        {Album.map((album)=>(
          <div key={album.id} onClick={()=>handleLibraryClick(album)} className='flex flex-col items-center rounded-md p-4 gap-4 bg-[#2b2b2b] hover:scale-105 transition-transform duration-300'>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden rounded-md">
              <img src={album.albumcover} alt="Track 1" className="w-full h-full object-cover" />
              <div className="absolute  inset-0 flex items-center justify-center ">
                <button  className="w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 flex items-center justify-center">
                  ▶
                </button>
              </div>
            </div>
            <h1 className='text-base sm:text-lg md:text-xl font-semibold text-center' >{album.albumname}</h1>
          </div>
        ))}
      </div>
        
    </div>
  )
}

export default Library
