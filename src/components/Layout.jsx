import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  Home,
  Compass,
  Library,
  Crown,
  Menu,
  X,
  Music2
} from 'lucide-react'
import NewSearch from './NewSearch'
import MiniPlayer from './MiniPlayer'

const navItems = [
  { to: '/app', icon: Home, label: 'Home' },
  { to: '/app/explore', icon: Compass, label: 'Explore' },
  { to: '/app/library', icon: Library, label: 'Library' },
  { to: '/app/upgrade', icon: Crown, label: 'Upgrade' },
]

const Layout = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const isActive = (path) => {
    if (path === '/app') return location.pathname === '/app'
    return location.pathname.startsWith(path)
  }

  return (
    <div className='flex flex-col w-full h-screen bg-black text-white overflow-hidden'>
      {/* Top Header */}
      <header className='flex items-center h-16 border-b border-[#464646] flex-shrink-0'>
        {/* Logo + Hamburger Section */}
        <div className={`flex items-center gap-3 px-4 h-full transition-all duration-300 ${isSidebarOpen ? 'w-[220px]' : 'w-20 md:w-[110px]'}`}>
          {/* Hamburger - Desktop only */}
          <button
            onClick={toggleSidebar}
            className='hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#2b2b2b] hover:bg-[#464646] transition-colors'
          >
            {isSidebarOpen ? (
              <X className='w-4 h-4 text-white' />
            ) : (
              <Menu className='w-4 h-4 text-white' />
            )}
          </button>

          {/* App Logo */}
          <Link to='/app' className='flex items-center gap-2'>
            <Music2 className='w-7 h-7 text-white' />
            <span className={`hidden md:block text-lg font-bold ${isSidebarOpen ? 'md:inline-block' : 'md:hidden'}`}>
              JPMUSIC
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className={`flex-1 h-full py-2 px-2 md:px-0 md:pr-20 transition-all duration-300 ${isSidebarOpen ? 'md:pl-16' : 'md:pl-6'}`}>
          <NewSearch />
        </div>
      </header>

      {/* Main Content Area */}
      <div className='flex flex-col md:flex-row flex-1 min-h-0 relative'>
        {/* Sidebar - Desktop: left sidebar, Mobile: bottom nav */}
        <aside className={`
          flex-shrink-0 bg-[#121212] md:bg-black border-t md:border-t-0 md:border-r border-[#464646]
          transition-all duration-300 z-50
          fixed bottom-0 left-0 w-full md:static md:h-auto
          ${isSidebarOpen ? 'h-16 md:w-[220px]' : 'h-16 md:w-16'}
        `}>
          <nav className='h-full'>
            <ul className='flex justify-around md:flex-col md:justify-start md:gap-2 h-full md:h-auto p-2'>
              {navItems.map((item) => {
                const active = isActive(item.to)
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`
                        flex items-center gap-4 p-2 md:p-3 rounded-lg transition-all duration-200
                        ${active
                          ? 'bg-transparent md:bg-[#2b2b2b] text-white'
                          : 'hover:bg-[#2b2b2b] text-gray-400 hover:text-white'
                        }
                      `}
                    >
                      <item.icon
                        className='w-6 h-6 md:w-5 md:h-5 flex-shrink-0'
                        strokeWidth={active ? 2.5 : 1.5}
                        fill={active ? 'currentColor' : 'none'}
                      />
                      <span className={`
                        text-xs md:text-sm font-medium
                        ${isSidebarOpen ? 'hidden md:inline-block' : 'hidden'}
                      `}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`
          flex-1 min-h-0 overflow-y-auto scroll-hidden
          pb-24 md:pb-0
          transition-all duration-300
          ${isSidebarOpen ? 'md:pl-8' : 'md:pl-14'}
          pr-0 md:pr-10
          pt-0 md:pt-4
        `}>
          <Outlet />
        </main>

        {/* Mini Player */}
        <MiniPlayer />
      </div>
    </div>
  )
}

export default Layout