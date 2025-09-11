import React, { useState, useEffect } from 'react'
import NewSearch from './NewSearch'
import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import MiniPlayer from './MiniPlayer'
const Layout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const togglesidebar = () => setIsSidebarOpen(!isSidebarOpen);
    //  bg-gradient-to-t from-black to-gray-950 
    return (
        <>
            <div className='flex flex-col itmes-center w-full h-screen'>
                <div className=' flex border-b-0 md:border-b border-[#464646]  h-full md:h-16'>
                    <div className={`h-16 flex  ml-2 md:ml-0 items-center gap-4 ${isSidebarOpen ? 'w-20 md:w-80' : 'w-20 md:w-44'}`}>
                        {/* hamburger  */}
                        <div className='hidden  ml-2 rounded-full md:flex items-center p-1.5 bg-[#2b2b2b] hover:bg-[#464646]'>
                            <button onClick={togglesidebar}>
                                <img src="/hamburger.svg" alt="hamsvg" />
                            </button>
                        </div>
                        <div className=''><img src="/app.svg" alt="svg" /></div>
                        {/* app icon */}
                    </div>
                    <div className={` w-full h-full py-2 p-0 md:pr-20 ${isSidebarOpen ? 'pl-0 md:pl-16' : 'pl-0 md:pl-6'}`} >
                        <NewSearch/>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  h-screen' >
                    {/* this is the side bar */}
                    <div className={` flex flex-col bg-[#121212] md:bg-black  border-t-0 md:border-t-0 md:border-r border-[#464646]  ${isSidebarOpen ? 'w-20 h-16 md:h-full md:w-80' : 'h-16 md:h-full md:w-16'}  fixed bottom-0 left-0 w-full md:static z-50 `}>
                        <div className=''>
                            <nav>
                                <ul className=' p-2 flex justify-around md:flex-col md:justify-normal gap-4'>
                                    <Link to="/app">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/app' ? 'bg-none md:bg-[#2b2b2b]' : 'hover:bg-[#2b2b2b]'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname === '/app' ? '#ffffff' : 'none'}>
                                                <path d="M22 10.5L12.8825 2.82207C12.6355 2.61407 12.3229 2.5 12 2.5C11.6771 2.5 11.3645 2.61407 11.1175 2.82207L2 10.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M20.5 9.5V16C20.5 18.3456 20.5 19.5184 19.8801 20.3263C19.7205 20.5343 19.5343 20.7205 19.3263 20.8801C18.5184 21.5 17.3456 21.5 15 21.5V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V21.5C6.65442 21.5 5.48164 21.5 4.67372 20.8801C4.46572 20.7205 4.27954 20.5343 4.11994 20.3263C3.5 19.5184 3.5 18.3456 3.5 16V9.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'hidden md:inline-block' : 'hidden'}`}>Home</span>
                                        </li>
                                    </Link>
                                    <Link to="/app/explore">
                                        <li className={`p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/app/explore' ? 'bg-none md:bg-[#2b2b2b]' : 'hover:bg-[#2b2b2b]'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname === '/app/explore' ? '#ffffff' : 'none'}>
                                                <path d="M18.2505 10.5H19.6403C21.4918 10.5 22.0421 10.7655 21.9975 12.0838C21.9237 14.2674 20.939 16.8047 17 17.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M5.94627 20.6145C2.57185 18.02 2.07468 14.3401 2.00143 10.5001C1.96979 8.8413 2.45126 8.5 4.65919 8.5H15.3408C17.5487 8.5 18.0302 8.8413 17.9986 10.5001C17.9253 14.3401 17.4281 18.02 14.0537 20.6145C13.0934 21.3528 12.2831 21.5 10.9194 21.5H9.08064C7.71686 21.5 6.90658 21.3528 5.94627 20.6145Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5M7.53971 4C7.53971 4 7 4.5 7 5.5M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'hidden md:inline-block' : 'hidden'}`}>Explore</span>
                                        </li>
                                    </Link>
                                    <Link to="/app/library">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/app/library' ? 'bg-none md:bg-[#2b2b2b]' : 'hover:bg-[#2b2b2b]'} `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname === '/app/library' ? '#ffffff' : 'none'}>
                                                <path d="M2 7C2 5.59987 2 4.8998 2.27248 4.36502C2.51217 3.89462 2.89462 3.51217 3.36502 3.27248C3.8998 3 4.59987 3 6 3C7.40013 3 8.1002 3 8.63498 3.27248C9.10538 3.51217 9.48783 3.89462 9.72752 4.36502C10 4.8998 10 5.59987 10 7V17C10 18.4001 10 19.1002 9.72752 19.635C9.48783 20.1054 9.10538 20.4878 8.63498 20.7275C8.1002 21 7.40013 21 6 21C4.59987 21 3.8998 21 3.36502 20.7275C2.89462 20.4878 2.51217 20.1054 2.27248 19.635C2 19.1002 2 18.4001 2 17V7Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M6 17H6.00898" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M2 7H10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M11.4486 8.26843C11.0937 6.93838 10.9163 6.27336 11.0385 5.69599C11.146 5.18812 11.4108 4.72747 11.7951 4.38005C12.2319 3.98508 12.8942 3.80689 14.2187 3.4505C15.5432 3.09412 16.2055 2.91593 16.7804 3.03865C17.2862 3.1466 17.7449 3.41256 18.0909 3.79841C18.4842 4.23706 18.6617 4.90209 19.0166 6.23213L21.5514 15.7316C21.9063 17.0616 22.0837 17.7266 21.9615 18.304C21.854 18.8119 21.5892 19.2725 21.2049 19.62C20.7681 20.0149 20.1058 20.1931 18.7813 20.5495C17.4568 20.9059 16.7945 21.0841 16.2196 20.9614C15.7138 20.8534 15.2551 20.5874 14.9091 20.2016C14.5158 19.7629 14.3383 19.0979 13.9834 17.7679L11.4486 8.26843Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M17.7812 16.6953L17.7899 16.693" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M12 8.00019L18.5001 6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'hidden md:inline-block' : 'hidden'}`}>Library</span>
                                        </li>
                                    </Link>
                                    <Link to="/app/upgrade">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/app/upgrade' ? 'bg-none md:bg-[#2b2b2b]' : 'hover:bg-[#2b2b2b]'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname === '/app/upgrade' ? '#ffffff' : 'none'}>
                                                <path d="M11 7.13678V17M11 7.13678C12.8928 8.81698 14.5706 10.0042 16.0063 10.6818C16.6937 11.0062 17.3165 11.0682 18.0198 10.7552C19.7751 9.97419 21 8.20629 21 6.15045C19.0715 7.50911 16.6876 6.77163 14.6847 5.50548C13.0454 4.46918 12.2258 3.95102 11.8569 4.00364C11.5781 4.0434 11.4283 4.1242 11.244 4.33421C11 4.61216 11 5.4537 11 7.13678Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'hidden md:inline-block' : 'hidden'}`}>Upgrade</span>
                                        </li>
                                    </Link>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* this is the main box for displaying the content  */}
                    <main className={` w-full flex-grow min-h-0  h-[calc(100vh-64px)] overflow-y-auto scroll-hidden pt-0 md:pt-8 pr-0  md:pr-20 ${isSidebarOpen ? 'pl-0 md:pl-16' : 'pl-0 sm:pl-2 md:pl-28'}`} >
                        <Outlet />
                    </main>
                    {/* this is the music player */}
                    <MiniPlayer />
                </div>
            </div>
        </>
    )
}

export default Layout
