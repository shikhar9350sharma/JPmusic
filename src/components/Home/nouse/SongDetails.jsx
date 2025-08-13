import React from 'react'
const SongDetails = () => {
        return (
            <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto min-h-[500px] md:h-screen p-1 rounded-xl'>
                <div className=' h-full rounded-xl bg-[#1b1b1b] flex flex-col p-2 sm:p-4 gap-2 sm:gap-3' >
                    {/* <div className='flex items-center gap-2'>
                        <div className='hover:border-gray-200 border border-transparent rounded-xl'>
                            <button className='text-sm flex items-center gap-2 bg-[#3b3b3b] p-2 rounded-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Minimize
                            </button>
                        </div>
                        <div className='hover:border-gray-200 border border-transparent rounded-xl'>
                            <button className='text-sm flex items-center gap-2 bg-[#3b3b3b] p-2 rounded-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                    <path d="M16.4999 3.26621C17.3443 3.25421 20.1408 2.67328 20.7337 3.26621C21.3266 3.85913 20.7457 6.65559 20.7337 7.5M20.5059 3.49097L13.5021 10.4961" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M3.26637 16.5001C3.25437 17.3445 2.67344 20.141 3.26637 20.7339C3.85929 21.3268 6.65575 20.7459 7.50016 20.7339M10.502 13.4976L3.49825 20.5027" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                Full Screen
                            </button>
                        </div>
                    </div> */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <div className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto text-sm flex items-center justify-center gap-2 bg-[#3b3b3b] p-2 rounded-xl hover:border-gray-200 border border-transparent">
                                {/* Minimize Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                                    <path d="M18 9C18 9 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Minimize</span>
                            </button>
                        </div>
                        <div className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto text-sm flex items-center justify-center gap-2 bg-[#3b3b3b] p-2 rounded-xl hover:border-gray-200 border border-transparent">
                                {/* Full Screen Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                                    <path d="M16.4999 3.26621C17.3443 3.25421 20.1408 2.67328 20.7337 3.26621C21.3266 3.85913 20.7457 6.65559 20.7337 7.5M20.5059 3.49097L13.5021 10.4961" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.26637 16.5001C3.25437 17.3445 2.67344 20.141 3.26637 20.7339C3.85929 21.3268 6.65575 20.7459 7.50016 20.7339M10.502 13.4976L3.49825 20.5027" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Full Screen</span>
                            </button>
                        </div>
                    </div>
                    <div className='w-full aspect-square rounded-xl relative overflow-hidden'>
                        {/* <img className='w-full h-auto max-h-[345px] object-cover rounded-xl border border-white' src={`https://picsum.photos/400/345`} alt="img" /> */}
                        <img className='w-full h-full object-cover rounded-xl' src={`https://ik.imagekit.io/shi23va533y/465.jpg?updatedAt=1753971826066`} alt="img" />
                        <div className='w-full h-32 absolute bottom-0 p-4 bg-black/20 rounded-xl'>
                            <div className='flex flex-col sm:flex-row items-center justify-between'>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='text-xl sm:text-2xl font-semibold'><h1>Dhun</h1></div>
                                    <div className='text-base sm:text-xl'><p>Arijit singh</p></div>
                                </div>
                                <div className='flex flex-col gap-2 items-end'>
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="currentColor">
                                            <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className=''>89,000,987 likes</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                            <path d="M20.0849 17C20.5849 15.5 21 13.4368 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4368 3.41512 15.5 3.91512 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.97651 19.6043L7.23857 14.6127C7.05341 14.1466 6.4617 13.9131 5.97493 14.0297C4.46441 14.5333 3.6462 16.1718 4.14742 17.6895L4.58543 19.0158C5.08664 20.5334 6.71747 21.3555 8.22799 20.8519C8.68896 20.6556 9.10449 20.0897 8.97651 19.6043Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M15.0235 19.6043L16.7614 14.6127C16.9466 14.1466 17.5383 13.9131 18.0251 14.0297C19.5356 14.5333 20.3538 16.1718 19.8526 17.6895L19.4146 19.0158C18.9134 20.5334 17.2825 21.3555 15.772 20.8519C15.311 20.6556 14.8955 20.0897 15.0235 19.6043Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className=''>87,897,876 monthly listeners</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    export default SongDetails
