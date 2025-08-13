import React from 'react'

const Upgrade = () => {
  return (
    <div>
      <div className='w-full h-full flex flex-col items-center justify-center gap-6 bg-black py-6'>
        <div className='w-80 h-80'>
            <img className='h-full w-full object-cover' src="cat.png" alt="img"/>
        </div>
        <h1 className='text-xl md:text-5xl capitalize '>Site Under Maintenance!</h1>
      </div>
    </div>
  )
}

export default Upgrade
