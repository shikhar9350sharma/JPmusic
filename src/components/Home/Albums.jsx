import React from 'react'

const Albums = () => {
    return (
        <div>
            <div className='w-full min-h-[20rem] rounded-lg flex flex-col sm:flex-col md:flex-row items-center  gap-4 p-6  bg-gradient-to-b from-gray-900 to-black'>
                <div className=' w-full md:w-1/2 lg:w-1/2 h-full flex flex-col items-start justify-evenly gap-4'>
                    <div className='capitalize text-base md:text-xl text-sky-200'>
                        <h1>this month's</h1>
                        <h1>record breaking albulms !</h1>
                    </div>
                    <div className='text-sm md:text-lg text-gray-400'>
                        <p>Discover the sounds that shattered charts this month—bold, fresh, and impossible to ignore.</p>
                        {/* <p>From viral hits to underground gems, this lineup is setting the tone for 2025.</p> */}
                    </div>
                    <div className='flex gap-3 flex-wrap'>
                        <button className='rounded-full border border-gray-600 py-2 px-4 hover:border-white font-medium text-sm'>Listen Now</button>
                        <button className='rounded-full border border-gray-600 py-2 px-4 hover:border-white font-medium text-sm'>Add To Queue</button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex justify-center flex-wrap gap-4 p-2'>
                    <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300'>
                        <img className='w-full h-full object-cover rounded-md' src="https://ik.imagekit.io/shi23va533y/Saiyaara.jpg?updatedAt=1753972892713" alt="" />
                    </div>
                    <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300'>
                        <img className='w-full h-full object-cover rounded-md' src="https://ik.imagekit.io/shi23va533y/Shiddat.jpg?updatedAt=1753973661031" alt="" />
                    </div>
                    <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300'>
                        <img className='w-full h-full object-cover rounded-md' src="https://ik.imagekit.io/shi23va533y/Janam-Janam.jpg?updatedAt=1753977032948" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Albums
