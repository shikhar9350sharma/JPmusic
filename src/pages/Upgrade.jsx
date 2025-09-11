import React from 'react'

const Upgrade = () => {
  return (
    <div>
      <div className='w-full h-full flex flex-col items-center justify-center gap-6 bg-black py-6'>
        <div className='w-80 h-80'>
            <img loading='lazy' className='h-full w-full object-cover' src="/cat.png" alt="img"/>
        </div>
        <h1 className='text-xl md:text-5xl capitalize '>Site Under Maintenance!</h1>
        <div className='flex gap-2'>
          <img width={24} height={24} src="/JP.svg" alt="jpsvg" />
          <img src="/app.svg" alt="appsvg" />
        </div>
        <div className='text-sm'>~shikhar sharma♥️</div>
      </div>
    </div>
  )
}

export default Upgrade
