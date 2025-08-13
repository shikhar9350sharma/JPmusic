import React from 'react'

const Searchbox = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-3 bg-[#3b3b3b] border border-transparent rounded-full px-4 py-2 hover:border-gray-200 transition-all duration-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0"
                    >
                        <path d="M17 17L21 21" />
                        <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" />
                    </svg>

                    <input
                        type="search"
                        name="search"
                        placeholder="Search by artists, songs, or albums"
                        className="sm:min-w-[180px] md:min-w-[300px] lg:min-w-[400px] bg-transparent outline-none text-white text-sm placeholder-gray-300 "
                    />
                </div>
                <div className="relative flex items-center">
                    <div className="z-10 text-center border-2 border-black p-2 rounded-full bg-[#3b3b3b] ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" />
                            <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" />
                        </svg>
                    </div>
                    <div className=" absolute right-8 text-center p-2 rounded-full bg-[#3b3b3b]">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 9V20" />
                            <path d="M8 4V20" />
                            <path d="M12 11V20" />
                            <path d="M16 7V20" />
                            <path d="M20 14V20" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbox
