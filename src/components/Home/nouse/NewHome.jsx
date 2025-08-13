import React, { useState, useEffect } from 'react'
import Searchbox from './Searchbox'
import ListenAgain from './ListenAgain'
import Albums from './Albums'
import QuickPlay from './QickPlay'
import Featured from './Featured'
import Artist from './Artist'
import NewSearch from './NewSearch'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Home = () => {
    const location = useLocation();
    const [songs, setSongs] = useState([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const togglesidebar = ()=> setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        fetch('http://localhost:3001/songs')
            .then((res) => res.json())
            .then((data) => setSongs((data)))
            .catch((err) => console.log('Fetching song cover error: ', err))
    }, [])
    //  bg-gradient-to-t from-black to-gray-950 
    return (
        <>
            <div className='flex flex-col w-full h-screen'>
                <div className='flex border-b border-[#464646] w-full h-16'>
                    <div className={`h-16 flex items-center gap-4  ${isSidebarOpen ? 'w-80': 'w-44'}`}>
                        {/* hamburger  */}
                        <div className='ml-2 rounded-full flex items-center p-1.5 bg-[#2b2b2b] hover:bg-[#464646]'>
                            <button onClick={togglesidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M4 5L20 5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M4 12L20 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M4 19L20 19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                        <div><img src="app.svg" alt="svg" /></div>
                        {/* app icon */}
                    </div>
                    <div className={` w-full h-full py-2 pr-20 ${isSidebarOpen ? 'pl-16': 'pl-6'}`} >
                        <NewSearch/>
                    </div>
                </div>
                <div className='flex h-full' >
                    {/* this is the side bar */}
                    <div className={`h-full flex flex-col border-r border-[#464646]  ${isSidebarOpen ? 'w-80':'w-16'} `}>
                        <div className=''>
                            <nav>
                                <ul className=' p-2 flex flex-col gap-4'>
                                    <Link to="/">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/' ? 'bg-[#2b2b2b]':'hover:bg-[#2b2b2b]'}`}>
                                            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname ==='/' ? '#ffffff':'none'}>
                                                <path d="M22 10.5L12.8825 2.82207C12.6355 2.61407 12.3229 2.5 12 2.5C11.6771 2.5 11.3645 2.61407 11.1175 2.82207L2 10.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M20.5 9.5V16C20.5 18.3456 20.5 19.5184 19.8801 20.3263C19.7205 20.5343 19.5343 20.7205 19.3263 20.8801C18.5184 21.5 17.3456 21.5 15 21.5V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393C9 14.8787 9 15.5858 9 17V21.5C6.65442 21.5 5.48164 21.5 4.67372 20.8801C4.46572 20.7205 4.27954 20.5343 4.11994 20.3263C3.5 19.5184 3.5 18.3456 3.5 16V9.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'inline-block':'hidden'}`}>Home</span>
                                        </li>
                                    </Link>
                                    <Link to="/explore">
                                        <li className={`p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/explore' ?'bg-[#2b2b2b]':'hover:bg-[#2b2b2b]' }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname ==='/explore'? '#ffffff' : 'none'}>
                                                <path d="M18.2505 10.5H19.6403C21.4918 10.5 22.0421 10.7655 21.9975 12.0838C21.9237 14.2674 20.939 16.8047 17 17.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M5.94627 20.6145C2.57185 18.02 2.07468 14.3401 2.00143 10.5001C1.96979 8.8413 2.45126 8.5 4.65919 8.5H15.3408C17.5487 8.5 18.0302 8.8413 17.9986 10.5001C17.9253 14.3401 17.4281 18.02 14.0537 20.6145C13.0934 21.3528 12.2831 21.5 10.9194 21.5H9.08064C7.71686 21.5 6.90658 21.3528 5.94627 20.6145Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5M7.53971 4C7.53971 4 7 4.5 7 5.5M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'inline-block':'hidden'}`}>Explore</span>
                                        </li>
                                    </Link>
                                    <Link to="/library">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/library'? 'bg-[#2b2b2b]': 'hover:bg-[#2b2b2b]'} `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname ==='/library'? '#ffffff' : 'none'}>
                                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#ffffff" strokeWidth="1.5"></path>
                                                <path d="M10 15.5C10 16.3284 9.32843 17 8.5 17C7.67157 17 7 16.3284 7 15.5C7 14.6716 7.67157 14 8.5 14C9.32843 14 10 14.6716 10 15.5ZM10 15.5V11C10 10.1062 10 9.65932 10.2262 9.38299C10.4524 9.10667 10.9638 9.00361 11.9865 8.7975C13.8531 8.42135 15.3586 7.59867 16 7V13.5M16 13.75C16 14.4404 15.4404 15 14.75 15C14.0596 15 13.5 14.4404 13.5 13.75C13.5 13.0596 14.0596 12.5 14.75 12.5C15.4404 12.5 16 13.0596 16 13.75Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'inline-block':'hidden'}`}>Library</span>
                                        </li>
                                    </Link>
                                    <Link to="/upgrade">
                                        <li className={` p-2 rounded flex items-center gap-4 transition-all duration-200
                                            ${location.pathname === '/upgrade' ?'bg-[#2b2b2b]':'hover:bg-[#2b2b2b]' }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill={location.pathname ==='/upgrade'? '#ffffff' : 'none'}>
                                                <path d="M11 7.13678V17M11 7.13678C12.8928 8.81698 14.5706 10.0042 16.0063 10.6818C16.6937 11.0062 17.3165 11.0682 18.0198 10.7552C19.7751 9.97419 21 8.20629 21 6.15045C19.0715 7.50911 16.6876 6.77163 14.6847 5.50548C13.0454 4.46918 12.2258 3.95102 11.8569 4.00364C11.5781 4.0434 11.4283 4.1242 11.244 4.33421C11 4.61216 11 5.4537 11 7.13678Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            <span className={` ${isSidebarOpen ? 'inline-block':'hidden'}`}>Upgrade</span>
                                        </li>
                                    </Link>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* this is the main box for displaying the content  */}
                    <div className= {`w-full h-[calc(100vh-64px)] overflow-y-scroll scroll-hidden py-4 pr-20 ${isSidebarOpen ? 'pl-16': 'pl-28'}`} >
                        <Albums />
                        <QuickPlay /> 
                        <ListenAgain songs={songs} />
                        <Featured />
                        <Artist />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
