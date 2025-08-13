import React from 'react'
import { useState, useEffect } from 'react'

const Lyrics = () => {
    const [lyrics, setLyrics] = useState([])
    useEffect(() => {
        fetch("https://dummyjson.com/quotes")
            .then((res) => res.json())
            .then((data) => setLyrics(data.quotes.slice(0, 6)))
            .catch((err) => console.log('Lyrics Fetching error:', err))
    }, [])

    return (
        <div>
            {lyrics.map((text) => (
            <div key={text.id} className='flex flex-col w-80 items-start space-x-2 px-3 py-2'> 
                <div className='text-xl font-sans font-semibold text-gray-200'><span>{text.quote}</span></div>
            </div>
             ))}
        </div>
    )
}

export default Lyrics
